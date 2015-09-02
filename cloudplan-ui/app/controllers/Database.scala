package controllers

import akka.pattern.{AskTimeoutException, ask}
import akka.util.Timeout
import com.sigmoid.cloudplan.common.resources.{Node, Hardware, Image, Region}
import controllers.Common._
import messages.database._
import play.api.Logger
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import sorm.Persisted

import scala.concurrent.duration._

/**
 * Created by ajay on 03/02/15.
 */

object Database extends Controller {

  implicit val nodeFormat = Json.format[Node]
  implicit val imageFormat = Json.format[Image]
  implicit val hardwareFormat = Json.format[Hardware]
  implicit val regionFormat = Json.format[Region]

  def listNodes = Action.async { implicit request =>
    val uid = fetchUID(request)
    (database.ask(RequestNodes)(Timeout(5.seconds))).mapTo[DatabaseCollection[Node]].map {
      case DatabaseCollection(nodes, resource) =>
        Logger.info(s"[$uid] called for nodes successfully")
        Ok(Json.toJson(nodes.asInstanceOf[List[Node with Persisted]]))
    }.recover {
      case error: AskTimeoutException =>
        Logger.error(s"[$uid] timed out calling nodes")
        InternalServerError("Database timed out")
    }
  }

  def listImages = Action.async { implicit request =>
    val uid = fetchUID(request)
    (database.ask(RequestImages)(Timeout(5.seconds))).mapTo[DatabaseCollection[Image]].map {
      case DatabaseCollection(images, resource) =>
        Logger.info(s"[$uid] called for images successfully")
        Ok(Json.toJson(images.asInstanceOf[List[Image with Persisted]]))
    }.recover {
      case error: AskTimeoutException =>
        Logger.error(s"[$uid] timed out calling images")
        InternalServerError("Database timed out")
    }
  }

  def listHardwares = Action.async { implicit request =>
    val uid = fetchUID(request)
    (database.ask(RequestHardwares)(Timeout(5.seconds))).mapTo[DatabaseCollection[Hardware]].map {
      case DatabaseCollection(hardwares, resource) =>
        Logger.info(s"[$uid] called for hardwares successfully")
        Ok(Json.toJson(hardwares.asInstanceOf[List[Hardware with Persisted]]))
    }.recover {
      case error: AskTimeoutException =>
        Logger.error(s"[$uid] timed out calling hardwares")
        InternalServerError("Database timed out")
    }
  }
  def listRegions = Action.async { implicit request =>
    val uid = fetchUID(request)
    (database.ask(RequestRegions)(Timeout(5.seconds))).mapTo[DatabaseCollection[Region]].map {
      case DatabaseCollection(regions, resource) =>
        Logger.info(s"[$uid] called for regions successfully")
        Ok(Json.toJson(regions.asInstanceOf[List[Region with Persisted]]))
    }.recover {
      case error: AskTimeoutException =>
        Logger.error(s"[$uid] timed out calling regions")
        InternalServerError("Database timed out")
    }
  }


}
