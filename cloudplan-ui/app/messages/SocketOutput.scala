package messages

import play.api.libs.json.Json
import play.api.mvc.WebSocket.FrameFormatter

/**
 * Created by ajay on 29/01/15.
 */

case class SocketOutput(task: String, description: String, running: Boolean)

object SocketOutput {
  implicit val outputFormat = Json.format[SocketOutput]
  implicit val outputFrameFormatter = FrameFormatter.jsonFrame[SocketOutput]
}
