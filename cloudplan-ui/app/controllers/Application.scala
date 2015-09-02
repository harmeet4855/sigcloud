package controllers

import akka.pattern.{AskTimeoutException, ask}
import akka.util.Timeout
import messages.database.RequestUser
import models.User
import play.api._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.mvc._

import scala.concurrent.duration._

object Application extends Controller {

  /*
  The main index page. Used for authenticating
   */
  def index = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, role) =>
        Logger.debug(s"[$name]: accessed index")
        Ok(views.html.index("Login | Cloudplan", User(uid, name, role)))
    }.recover {
      case error: AskTimeoutException =>
        Logger.error(s"[$uid] timed out fetching user")
        Ok(views.html.index("Login | Cloudplan", User(uid, "Guest", "developer")))
    }
  }

  /*
  Authorizes user based on UID session value
   */
  def authorize = Action { implicit request =>
    val uid = Common.fetchUID(request)
    val (name, role) = Forms.userForm.bindFromRequest.get
    Common.database ! User(uid, name, role)
    Logger.info(uid)
    Redirect(routes.Application.dashboard()).withCookies(Cookie(Common.UID, uid))
  }

  /*
  Form for launching a new cluster
   */

  def loadResources = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, "admin") =>
        Logger.debug(s"[$name]: accessed loadResources")
        Ok(views.html.forms.loadResources("Load cluster resources", User(uid, name, "admin")))
      case User(uid, name, "developer") =>
        Logger.debug(s"[$name]: unauthorized access to loadResources")
        Ok(views.html.defaultpages.unauthorized())
    }
  }

  def launchGCECluster = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, role) =>
        Logger.debug(s"[$name]: accessed launchCluster")
        Ok(views.html.forms.launchGCECluster("Launch a cluster", User(uid, name, role)))
    }
  }

  def launchAWSCluster = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, role) =>
        Logger.debug(s"[$name]: accessed launchCluster")
        Ok(views.html.forms.launchAWSCluster("Launch a cluster", User(uid, name, role)))
    }
  }

  def loadCluster = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, "admin") =>
        Logger.debug(s"[$name]: accessed loadCluster")
        Ok(views.html.forms.loadCluster("Load a cluster", User(uid, name, "admin")))
      case User(uid, name, "developer") =>
        Logger.debug(s"[$name]: unauthorized access to loadCluster")
        Ok(views.html.defaultpages.unauthorized())
    }
  }

  def terminateCluster = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, "admin") =>
        Logger.debug(s"[$name]: accessed terminateCluster")
        Ok(views.html.forms.terminateCluster("Terminate a cluster", User(uid, name, "admin")))
      case User(uid, name, "developer") =>
        Logger.debug(s"[$name]: unauthorized access to terminateCluster")
        Ok(views.html.defaultpages.unauthorized())
    }
  }

  def runScriptOnCluster = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, "admin") =>
        Logger.debug(s"[$name]: accessed runScriptOnCluster")
        Ok(views.html.forms.runScriptOnCluster("Run script on a cluster", User(uid, name, "admin")))
      case User(uid, name, "developer") =>
        Logger.debug(s"[$name]: unauthorized access to runScriptOnCluster")
        Ok(views.html.defaultpages.unauthorized())
    }
  }

  def addNodes = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, role) =>
        Logger.debug(s"[$name]: accessed addNodes")
        // Ok(views.html.forms.addnode("Adding node to cluster"), User(uid, name, role))
        Ok(views.html.defaultpages.todo())
    }
  }

  /*
  The starting point for all cluster operations
   */
  def dashboard = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, role) =>
        Logger.debug(s"[$name]: accessed dashboard")
        Ok(views.html.dashboard("Welcome to Cloudplan", User(uid, name, role)))
    }
  }

  /*
  Resources views
   */

  def nodes = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, role) =>
        Logger.debug(s"[$name]: accessed nodes")
        Ok(views.html.resources.nodes("Listing nodes", routes.Socket.querySocket.webSocketURL(), User(uid, name, role)))
    }
  }

  def nodesOfCluster(group: String) = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, role) =>
        Logger.debug(s"[$name]: accessed nodesOfCluster")
        Ok(views.html.resources.nodesOfCluster("Listing nodes", routes.Socket.querySocket.webSocketURL(), group, User(uid, name, role)))
    }
  }

  def configureCluster(group: String) = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, "admin") =>
        Logger.debug(s"[$name]: accessed configureCluster")
        Ok(views.html.forms.configureClusterService("Configure cluster services", routes.Socket.querySocket.webSocketURL(), group, User(uid, name, "admin")))
      case User(uid, name, "developer") =>
        Logger.debug(s"[$name]: unauthorized access to configureCluster")
        Ok(views.html.defaultpages.unauthorized())
    }
  }

  def clusters = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, role) =>
        Logger.debug(s"[$name]: accessed clusters")
        Ok(views.html.resources.clusters("Listing clusters", routes.Socket.querySocket.webSocketURL(), User(uid, name, role)))
    }
  }

  def images = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, "admin") =>
        Logger.debug(s"[$name]: accessed images")
        Ok(views.html.resources.images("Listing images", routes.Socket.querySocket.webSocketURL(), User(uid, name, "admin")))
      case User(uid, name, "developer") =>
        Logger.debug(s"[$name]: unauthorized access to images")
        Ok(views.html.defaultpages.unauthorized())
    }
  }

  def hardwares = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, "admin") =>
        Logger.debug(s"[$name]: accessed hardwares")
        Ok(views.html.resources.hardwares("Listing hardwares", routes.Socket.querySocket.webSocketURL(), User(uid, name, "admin")))
      case User(uid, name, "developer") =>
        Logger.debug(s"[$name]: unauthorized access to hardwares")
        Ok(views.html.defaultpages.unauthorized())
    }
  }

  def regions = Action.async { implicit request =>
    val uid = Common.fetchUID(request)
    (Common.database.ask(RequestUser(uid))(Timeout(5.seconds))).mapTo[User].map {
      case User(uid, name, "admin") =>
        Logger.debug(s"[$name]: accessed regions")
        Ok(views.html.resources.regions("Listing regions", routes.Socket.querySocket.webSocketURL(), User(uid, name, "admin")))
      case User(uid, name, "developer") =>
        Logger.debug(s"[$name]: unauthorized access to regions")
        Ok(views.html.defaultpages.unauthorized())
    }
  }

}