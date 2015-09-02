package controllers

import actors.{QueryActor, UserActor}
import controllers.Common._
import messages._
import play.api.Play.current
import play.api.libs.json.JsValue
import play.api.mvc.{Controller, WebSocket}

import scala.concurrent.Future

/**
 * Created by ajay on 29/01/15.
 */

object Socket extends Controller {

  def socket = WebSocket.tryAcceptWithActor[SocketInput, SocketOutput] { request =>
    Future.successful(request.cookies.get(UID) match {
      case None =>
        Left(Forbidden)
      case Some(uid) =>
        Right(UserActor.props(uid.value))
    })
  }

  def querySocket = WebSocket.tryAcceptWithActor[QueryInput, JsValue] { request =>
    Future.successful(request.cookies.get(UID) match {
      case None =>
        Left(Forbidden)
      case Some(uid) =>
        Right(QueryActor.props(uid.value))
    })
  }
}
