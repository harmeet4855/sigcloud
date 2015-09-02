package models

import com.sigmoid.cloudplan.common.resources.Node
import play.api.libs.json.Json

/**
 * Created by ajay on 20/02/15.
 */

case class ClusterServicesOutput(cluster: String, masters: Seq[Node], slaves: Seq[Node], namenodes: Seq[Node], datanodes: Seq[Node], journalnodes: Seq[Node], hmasters: Seq[Node], regionservers: Seq[Node], gmetads: Seq[Node], gmonds: Seq[Node], drivers: Seq[Node])

object ClusterServicesOutput {
  implicit val nodeFormat = Json.format[Node]
  implicit val mesosServiceOutputFormat = Json.format[ClusterServicesOutput]
}
