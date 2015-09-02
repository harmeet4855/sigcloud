package messages.database

/**
 * Created by ajay on 20/02/15.
 */

case class RemoveNodeOfCluster(group: String, node: String) extends Query with Database {
  val name = "remove-node-from-database"
  val description = "Removing node information from database"
}