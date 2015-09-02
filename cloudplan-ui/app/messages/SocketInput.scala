package messages

import play.api.libs.json.Json
import play.api.mvc.WebSocket.FrameFormatter

/**
 * Created by ajay on 29/01/15.
 */

case class SocketInput(task: String, query: Option[String])

object SocketInput {
  implicit val inputFormat = Json.format[SocketInput]
  implicit val inputFrameFormatter = FrameFormatter.jsonFrame[SocketInput]
}


