package actors

import akka.actor._
import akka.util.Timeout
import com.sigmoid.cloudplan.common.Credential
import com.sigmoid.cloudplan.scheduler.SchedulerActor
import com.sigmoid.cloudplan.scheduler.message._
import controllers.Common
import messages.database.{Database, DatabaseCollection, RequestRegions}
import messages.{SocketInput, SocketOutput}
import play.api.Logger

import scala.concurrent.duration._

/**
 * Created by ajay on 28/01/15.
 */

class UserActor(uid: String, out: ActorRef) extends Actor with ActorLogging {

  implicit val timeout = Timeout(60.seconds)
  val credential = Credential("google-compute-engine")
//  val credential = Credential("aws-ec2")
  val cloudplan = context.actorOf(SchedulerActor.props(self), "cloudplan")
  val database = context.actorOf(DatabaseActor.props, "database")

  // Filtering the tasks for that user id and mapping to a seq of tasks for backward compatibility
  val (databaseTasks, tasks) = Common.tasks.dequeueAll {
    case (uid, task) => uid == this.uid
  }.map {
    case (_, task) => task
  }.partition(task => task.isInstanceOf[Database]) // Removing database tasks

  def receive = {

    // From websocket
    case SocketInput("Ready", _) => {
      Logger.info("starting cloudplan api operation")
      tasks.foreach(task => cloudplan ! task)
//      val configuration = ClusterConfiguration("google-compute-engine", "ajaytest", "backports-debian-7-wheezy-v20150127", "us-central1-b", "us-central1-b/n1-standard-4", Some("sigmoid-private"), 4, Some("Ajay"), "ajay")
//      val configuration = ClusterConfiguration("aws-ec2", "ajaytest", "us-east-1/ami-baeda9d2", "us-east-1", "m1.large", None, 4, Some("Ajay"), "ajay")
//      cloudplan ! credential
//      cloudplan ! FetchRegion
//      cloudplan ! LoadCluster("sigmoiddemo")
//      cloudplan ! RunScriptOnCluster("delete-logs", "rm -rf /tmp/spark-*", "root")
//      cloudplan ! RunScriptOnCluster("delete-mesos-logs", "rm -rf /var/log/mesos/*", "root")
//      cloudplan ! RunScriptOnCluster("delete-mesos-libs", "rm -rf /var/lib/mesos/*", "root")
//      cloudplan ! RunScriptOnCluster("truncate-user-log", "echo | tee /var/log/user.log", "root")
//      cloudplan ! RunScriptOnCluster("delete-old-user-log", "rm /var/log/user.log.*", "root")
//      cloudplan ! RunScriptOnCluster("truncate-syslog-log", "echo | tee /var/log/syslog", "root")
//      cloudplan ! RunScriptOnCluster("delete-old-syslog-log", "rm /var/log/syslog.*", "root")
//      cloudplan ! RunScriptOnCluster("stopping mesos-slaves", "service mesos-slave stop", "root")
//        cloudplan ! RunScriptOnCluster("stopping mesos-slaves", "service mesos-slave start", "root")
//      cloudplan ! RunScriptOnCluster("stopping mesos-master", "service mesos-master stop", "root")
//      cloudplan ! RunScriptOnCluster("chown -R hadoop:hadoop /hadoop", "root")
//      cloudplan ! RunScriptOnCluster("chown -R hadoop:hadoop /home/hadoop", "root")
//      cloudplan ! FetchNodes
//      cloudplan ! LoadCluster("ajaytest")
//      cloudplan ! TerminateCluster
//      cloudplan ! CreateCluster(configuration)
//      cloudplan ! BootstrapCluster
//      cloudplan ! InstallMesos
//      cloudplan ! InstallHadoop
//      cloudplan ! InstallSpark
      cloudplan ! Execute
    }

    case SocketInput("Fetch", query) => {
      Logger.info("fetching data from database")
      Logger.info(query.get)
      database ! RequestRegions
    }

    // From cloudplan
    case Running(task) =>
      out ! SocketOutput(task.name, task.description, true)
    case Finished(task) =>
      out ! SocketOutput(task.name, task.description, false)
    case Completed => {
      databaseTasks.foreach(task => database ! task)
      context.system.scheduler.scheduleOnce(5.seconds)(out ! PoisonPill)(context.dispatcher)
      // Kill the actors after 5 seconds
    }
    case collection: Collection =>
      Logger.info(collection.list.mkString(","))
      database ! collection
    case Terminated =>
      log.info("cluster has been terminated")

    // From database
    case DatabaseCollection(collection, _) =>
      Logger.info("fetched data from database")
      Logger.info(collection.mkString(","))

  }

}

object UserActor {

  def props(uid: String)(out: ActorRef) = {
    Props(new UserActor(uid, out))
  }

}
