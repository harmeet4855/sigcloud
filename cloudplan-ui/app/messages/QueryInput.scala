package messages

import play.api.libs.json.Json
import play.api.mvc.WebSocket.FrameFormatter

/**
 * Created by ajay on 19/02/15.
 */

case class QueryInput(query: String, filter: Option[String])

object QueryInput {
  implicit val inputFormat = Json.format[QueryInput]
  implicit val inputFrameFormatter = FrameFormatter.jsonFrame[QueryInput]
}