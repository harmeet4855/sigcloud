package actors

import akka.actor.{Actor, ActorLogging, ActorRef, Props}
import com.sigmoid.cloudplan.common.resources._
import messages.QueryInput
import messages.database._
import models.ClusterServicesOutput
import play.api.libs.json.Json
import sorm.Persisted

/**
 * Created by ajay on 19/02/15.
 */

class QueryActor(uid: String, out: ActorRef) extends Actor with ActorLogging {

  val database = context.actorOf(DatabaseActor.props, "database")

  def receive = {
    // Receiving input from socket
    case QueryInput("nodes", None) =>
      database ! RequestNodes
    case QueryInput("nodes", Some(group)) =>
      database ! RequestNodesOfCluster(group)
    case QueryInput("clusters", None) =>
      database ! RequestClusters
    case QueryInput("images", None) =>
      database ! RequestImages
    case QueryInput("hardwares", None) =>
      database ! RequestHardwares
    case QueryInput("regions", None) =>
      database ! RequestRegions
    case QueryInput("mesos", Some(group)) =>
      database ! RequestClusterServices(group)

    // Sending output to socket
    case DatabaseCollection(query, resource) => resource.getSimpleName match {
      case "Node" =>
        implicit val format = Json.format[Node]
        out ! Json.toJson(query.asInstanceOf[List[Node with Persisted]])
      case "Cluster" =>
        implicit val format = Json.format[Cluster]
        out ! Json.toJson(query.asInstanceOf[List[Cluster with Persisted]])
      case "Image" =>
        implicit val format = Json.format[Image]
        out ! Json.toJson(query.asInstanceOf[List[Image with Persisted]])
      case "Hardware" =>
        implicit val format = Json.format[Hardware]
        out ! Json.toJson(query.asInstanceOf[List[Hardware with Persisted]])
      case "Region" =>
        implicit val format = Json.format[Region]
        out ! Json.toJson(query.asInstanceOf[List[Region with Persisted]])
      case _ =>
    }

    case configuration: ClusterServicesOutput =>
      out ! Json.toJson(configuration)
  }

}

object QueryActor {
  def props(uid: String)(out: ActorRef) = {
    Props(new QueryActor(uid, out))
  }
}
