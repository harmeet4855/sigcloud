package actors

import akka.actor.{Actor, ActorLogging, Props}
import com.sigmoid.cloudplan.common.Queryable
import com.sigmoid.cloudplan.common.resources._
import com.sigmoid.cloudplan.scheduler.message.{HardwareList, ImageList, NodeList, RegionList}
import messages.database._
import models._
import org.h2.jdbc.JdbcSQLException
import play.api.Logger
import sorm.core.SormException

import scala.reflect.runtime.universe.TypeTag
import scala.util.{Failure, Success, Try}

/**
 * Created by ajay on 31/01/15.
 */

class DatabaseActor extends Actor with ActorLogging {

  import actors.DatabaseActor._

  def receive = {
    case NodeList(nodes) =>
      nodes.foreach(node => add(node))
      // Extracting cluster info from nodes
      val groups = nodes.groupBy(node => node.cluster).map {
        case (name, nodes) => Cluster(name, nodes.size, nodes.groupBy(node => node.provider).keySet.head)
      }.toList
      groups.foreach(group => add(group))
    case ImageList(images) =>
      images.foreach(image => add(image))
    case HardwareList(hardwares) =>
      hardwares.foreach(hardware => add(hardware))
    case RegionList(regions) =>
      regions.foreach(region => add(region))

    case configuration: ClusterServices =>
      add(configuration)

    case user: User =>
      add(user)

    case RequestNodes =>
      sender ! DatabaseCollection(fetchAll[Node]().toList, classOf[Node])
    case RequestNodesOfCluster(group) =>
      sender ! DatabaseCollection(fetchAllByName[Node]("cluster" -> group).toList, classOf[Node])
    case RemoveNodesOfCluster(group) =>
      removeAllByName[Node]("cluster" -> group)
      removeAllByName[Cluster]("name" -> group)
      removeByName[ClusterServices]("cluster" -> group)
    case RemoveNodeOfCluster(group, name) =>
      removeNodeFromClusterServices(group, name)
      removeByName[Node]("name" -> name)
      replaceClusterCount(group, -1)
    case RequestClusters =>
      sender ! DatabaseCollection(fetchAll[Cluster]().toList, classOf[Cluster])
    case RequestImages =>
      sender ! DatabaseCollection(fetchAll[Image]().toList, classOf[Image])
    case RequestHardwares =>
      sender ! DatabaseCollection(fetchAll[Hardware]().toList, classOf[Hardware])
    case RequestRegions =>
      sender ! DatabaseCollection(fetchAll[Region]().toList, classOf[Region])

    case RequestClusterServices(cluster) =>
      val configuration = fetchByName[ClusterServices]("cluster" -> cluster)
      val masters = configuration.masters.map(ip => fetchByName[Node]("privateIp" -> ip)).sortBy(node => node.name)
      val slaves = configuration.slaves.map(ip => fetchByName[Node]("privateIp" -> ip)).sortBy(node => node.name)
      val namenodes = configuration.namenodes.map(ip => fetchByName[Node]("privateIp" -> ip)).sortBy(node => node.name)
      val datanodes = configuration.datanodes.map(ip => fetchByName[Node]("privateIp" -> ip)).sortBy(node => node.name)
      val journalnodes = configuration.journalnodes.map(ip => fetchByName[Node]("privateIp" -> ip)).sortBy(node => node.name)
      val hmasters = configuration.hmasters.map(ip => fetchByName[Node]("privateIp" -> ip)).sortBy(node => node.name)
      val regionservers = configuration.regionservers.map(ip => fetchByName[Node]("privateIp" -> ip)).sortBy(node => node.name)
      val gmetads = configuration.gmetads.map(ip => fetchByName[Node]("privateIp" -> ip)).sortBy(node => node.name)
      val gmonds = configuration.gmonds.map(ip => fetchByName[Node]("privateIp" -> ip)).sortBy(node => node.name)
      val drivers = configuration.drivers.map(ip => fetchByName[Node]("privateIp" -> ip)).sortBy(node => node.name)
      sender ! ClusterServicesOutput(cluster, masters, slaves, namenodes, datanodes, journalnodes, hmasters, regionservers, gmetads, gmonds, drivers)

    case RequestUser(uid) =>
      sender ! fetchByName[User]("uid" -> uid)
  }
}

object DatabaseActor {
  def props = {
    Props[DatabaseActor]
  }

  val ID = "id"

  /*
  Generic implementation of adding to database
   */
  def add[T <: Queryable : TypeTag](query: T) = {
    Try(DB.save[T](query)) match {
      case Success(result) => Logger.debug(s"saved $query to database")
      case Failure(error: JdbcSQLException) =>
        DB.query[T].replace(query)
        Logger.info("duplicate entry, updating entry")
      case Failure(error: SormException) => Logger.error("entity not registered, add to sorm configuration")
      case Failure(error) => Logger.error(error.getMessage)
    }
  }

  /*
  Generic implementation of fetching an entry by id
   */
  def fetchById[T <: Queryable : TypeTag](id: Long) = {
    DB.query[T].whereEqual(ID, id).fetchOne().get
  }

  /*
  Generic implementation of fetching an entry by name
   */
  def fetchByName[T <: Queryable : TypeTag](pair: (String, String)) = {
    DB.query[T].whereEqual(pair._1, pair._2).fetchOne().get
  }

  /*
  Generic implementation of fetching filtered entries by name
   */
  def fetchAllByName[T <: Queryable : TypeTag](pair: (String, String)) = {
    DB.query[T].whereEqual(pair._1, pair._2).order("name").fetch()
  }

  /*
  Generic implementation of fetching all entries
   */
  def fetchAll[T <: Queryable : TypeTag]() = {
    DB.query[T].fetch()
  }

  /*
  Generic implementation of removal by id
   */
  def removeById[T <: Queryable : TypeTag](id: Long) = {
    val query = fetchById[T](id)
    Logger.info(s"removing ${query.toString}")
    DB.delete[T](query)
  }

  /*
  Generic implementation of removal by id
   */
  def removeByName[T <: Queryable : TypeTag](pair: (String, String)) = {
    val query = fetchByName[T](pair)
    Logger.info(s"removing ${query.toString}")
    DB.delete[T](query)
  }

  /*
  Generic implementation of removal of filtered items by name
   */
  def removeAllByName[T <: Queryable : TypeTag](pair: (String, String)) = {
    val queries = fetchAllByName[T](pair)
    queries.foreach(query => removeById[T](query.id))
  }

  def replaceClusterCount(name: String, offset: Int) = {
    val query = fetchByName[Cluster]("name" -> name)
    val updated = Cluster(query.name, query.count + offset, query.provider)
    DB.query[Cluster].replace(updated)
  }

  def removeNodeFromClusterServices(group: String, name: String) = {
    val node = fetchByName[Node]("name" -> name)
    def filter(ip: String) = ip != node.privateIp
    val configuration = fetchByName[ClusterServices]("cluster" -> group).mixoutPersisted[ClusterServices]._2 match {
      case ClusterServices(cluster, masters, slaves, namenodes, datanodes, journalnodes, hmasters, regionservers, gmetads, gmonds, drivers) =>
        ClusterServices(cluster, masters.filter(filter), slaves.filter(filter), namenodes.filter(filter), datanodes.filter(filter), journalnodes.filter(filter), hmasters.filter(filter), regionservers.filter(filter), gmetads.filter(filter), gmonds.filter(filter), drivers.filter(filter))
    }
    DB.query[ClusterServices].replace(configuration)
  }
}
