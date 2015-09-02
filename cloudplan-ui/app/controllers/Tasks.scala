package controllers

import akka.pattern.ask
import akka.util.Timeout
import com.sigmoid.cloudplan.cluster.message._
import com.sigmoid.cloudplan.common.Credential
import com.sigmoid.cloudplan.compute.message.{FetchHardware, FetchImage, FetchRegion}
import com.sigmoid.cloudplan.scheduler.message.Authentication
import controllers.Common._
import messages.database.{RemoveNodeOfCluster, RemoveNodesOfCluster, RequestUser}
import models.User
import play.api.Logger
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.mvc.{Action, Controller}

import scala.concurrent.duration._

/**
* Created by ajay on 03/02/15.
*/

object Tasks extends Controller {

  val tasks = Common.tasks

  /*
  Task list for loading cluster resources into database
   */
  def loadResources = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, "admin") =>
        Logger.debug(s"[$name]: performing loadResources")
        val provider = Forms.resourceProviderForm.bindFromRequest.get
        tasks += uid -> Authentication(Credential(provider))
        tasks += uid -> FetchImage
        tasks += uid -> FetchHardware
        tasks += uid -> FetchRegion
        Ok(views.html.load("Tasks are running", "Fetching cloud resources", None, routes.Socket.socket.webSocketURL(), routes.Application.dashboard(), User(uid, name, "admin")))
      case User(uid, name, "developer") =>
        Logger.debug(s"[$name]: unauthorized access to perform loadResources")
        Ok(views.html.defaultpages.unauthorized())
    }
  }

  /*
    Task list for launching a new cluster
     */
  def launchGCECluster = Action.async { implicit request =>
    val uid = fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, role) =>
        val configuration = Forms.googleComputeEngineClusterConfigurationForm.bindFromRequest.get
        tasks += uid -> Authentication(Credential(configuration.provider))
        tasks += uid -> CreateCluster(configuration)
        tasks += uid -> BootstrapCluster
        tasks += uid -> InstallMesos
        tasks += uid -> InstallHadoop
        tasks += uid -> InstallHbase
        tasks += uid -> InstallSpark
        tasks += uid -> InstallGanglia
        Ok(views.html.load("Tasks are running", "Launching cluster", None, routes.Socket.socket.webSocketURL(), routes.Application.configureCluster(configuration.name), User(uid, name, role)))
      }
    }

  def launchAWSCluster = Action.async { implicit request =>
    val uid = fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, role) =>
        val configuration = Forms.awsEc2ClusterConfigurationForm.bindFromRequest.get
        tasks += uid -> Authentication(Credential(configuration.provider))
        tasks += uid -> CreateCluster(configuration)
        tasks += uid -> BootstrapCluster
        tasks += uid -> MountDisks
        tasks += uid -> InstallMesos
        tasks += uid -> InstallHadoop
        tasks += uid -> InstallHbase
        tasks += uid -> InstallSpark
        tasks += uid -> InstallGanglia
        Ok(views.html.load("Tasks are running", "Launching cluster", None, routes.Socket.socket.webSocketURL(), routes.Application.configureCluster(configuration.name), User(uid, name, role)))
    }
  }

  def loadCluster = Action.async { implicit request =>
    val uid = fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, "admin") =>
        Logger.debug(s"[$name]: performing loadCluster")
        val (provider, cluster, sshUser) = Forms.loadClusterForm.bindFromRequest.get
        tasks += uid -> Authentication(Credential(provider))
        tasks += uid -> LoadCluster(cluster, Some(sshUser))
        tasks += uid -> BootstrapCluster
        tasks += uid -> MountDisks
        tasks += uid -> InstallMesos
        tasks += uid -> InstallHadoop
        tasks += uid -> InstallHbase
        tasks += uid -> InstallSpark
        tasks += uid -> InstallGanglia
        Ok(views.html.load("Tasks are running", "Loading cluster", None, routes.Socket.socket.webSocketURL(), routes.Application.configureCluster(cluster), User(uid, name, "admin")))
    }
  }

  def configureClusterServices = Action { implicit request =>
    val uid = fetchUID(request)
    val mesosConfiguration = Forms.mesosConfigurationForm.bindFromRequest.get
    Common.database ! mesosConfiguration
    Redirect(routes.Application.nodesOfCluster(mesosConfiguration.cluster))
  }

  def restartNode = Action.async { implicit request =>
    val uid = fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, role) =>
        val (provider, cluster, name) = Forms.restartNodeForm.bindFromRequest.get
        tasks += uid -> Authentication(Credential(provider))
        tasks += uid -> LoadCluster(cluster, None)
        tasks += uid -> RestartNodeOnCluster(name)
        Ok(views.html.load("Tasks are running", "Restarting node", None, routes.Socket.socket.webSocketURL(), routes.Application.nodes(), User(uid, name, role)))
    }
  }

  def terminateNode = Action.async { implicit request =>
    val uid = fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, role) =>
        val (provider, cluster, name) = Forms.terminateNodeForm.bindFromRequest.get
        tasks += uid -> Authentication(Credential(provider))
        tasks += uid -> LoadCluster(cluster, None)
        tasks += uid -> TerminateNodeOnCluster(name)
        tasks += uid -> RemoveNodeOfCluster(cluster, name)
        Ok(views.html.load("Tasks are running", "Terminating node", None, routes.Socket.socket.webSocketURL(), routes.Application.nodes(), User(uid, name, role)))
    }
  }

  def restartCluster = Action.async { implicit request =>
    val uid = fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, role) =>
        val (provider, cluster) = Forms.restartClusterForm.bindFromRequest.get
        tasks += uid -> Authentication(Credential(provider))
        tasks += uid -> LoadCluster(cluster, None)
        tasks += uid -> RestartCluster
        Ok(views.html.load("Tasks are running", "Restarting cluster", None, routes.Socket.socket.webSocketURL(), routes.Application.nodes(), User(uid, name, role)))
    }
  }

  def terminateCluster = Action.async { implicit request =>
    val uid = fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, role) =>
        val (provider, cluster) = Forms.terminateClusterForm.bindFromRequest.get
        tasks += uid -> Authentication(Credential(provider))
        tasks += uid -> LoadCluster(cluster, None)
        tasks += uid -> TerminateCluster
        tasks += uid -> RemoveNodesOfCluster(cluster)
        Ok(views.html.load("Tasks are running", "Terminating cluster", None, routes.Socket.socket.webSocketURL(), routes.Application.nodes(), User(uid, name, role)))
    }
  }

  def runScriptOnCluster = Action.async { implicit request =>
    val uid = fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, "admin") =>
        Logger.debug(s"[$name]: performing loadResources")
        val (provider, cluster, detail, command, user, sshUser) = Forms.clusterScriptForm.bindFromRequest.get
        tasks += uid -> Authentication(Credential(provider))
        tasks += uid -> LoadCluster(cluster, Some(sshUser))
        tasks += uid -> RunScriptOnCluster(detail, command, user)
        Ok(views.html.load("Tasks are running", "Running script on cluster", None, routes.Socket.socket.webSocketURL(), routes.Application.nodes(), User(uid, name, "admin")))
    }

  }

  def addNodes = Action.async { implicit request =>
    val uid = fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, role) =>
        Logger.debug(s"[$name]: performing loadResources")
        //    val configuration = Forms.clusterConfigurationForm.bindFromRequest.get
        //    tasks += Authentication(Credential(configuration.provider))
        tasks += uid -> Authentication(Credential("google-compute-engine"))
        tasks += uid -> FetchRegion
        Ok(views.html.load("Tasks are running", "Adding nodes to cluster", None, routes.Socket.socket.webSocketURL(), routes.Application.nodes(), User(uid, name, role)))
    }
  }

}
