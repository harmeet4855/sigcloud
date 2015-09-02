package messages.database

/**
 * Created by ajay on 20/02/15.
 */

case class RemoveNodesOfCluster(group: String) extends Query with Database {
  val name = "remove-cluster-from-database"
  val description = "Removing cluster information from database"
}