package controllers

import actors.DatabaseActor
import com.sigmoid.cloudplan.common.Task
import messages.database.Query
import play.api.Play.current
import play.api.libs.concurrent.Akka
import play.api.mvc.{AnyContent, Cookie, Request}

import scala.collection.mutable
import scala.util.Random

/**
 * Created by ajay on 30/01/15.
 */

object Common {

  // The name for the UID session variable
  val UID = "uid"
  val CLUSTER = "cluster"

  // The actor that accesses the database
  val database = Akka.system.actorOf(DatabaseActor.props, "database")

  val tasks = mutable.Queue.empty[(String, Task)]
  val queries = mutable.Queue.empty[(String, Query)]

  /*
  Calculates the time elapsed running a particular function. Takes start and stop times as input
   */
  def getElapsedTime(start: Long, stop: Long): Long = {
    (stop - start) / 1000
  }

  /*
  A dummy function to simulate cluster tasks. Used for debugging
   */
  def intensiveComputation(): Unit = {
    Thread.sleep(2000) // Give a minimum time delay
    Thread.sleep(Random.nextInt(3) * 1000)
  }

  /*
  Fetches the current time from the system
   */
  def getTime(): Long = {
    System.currentTimeMillis()
  }

  /*
  Generates a random UID for the users session
   */
  def generateUID(): String =
    java.util.UUID.randomUUID.toString

  /*
  Fetches an existing. Else generates a new one
   */
  def fetchUID(request: Request[AnyContent]) = {
    fetchCookie(request, UID).getOrElse(Cookie(UID, generateUID())).value
  }

  def fetchCookie(request: Request[AnyContent], KEY: String) = {
    request.cookies.get(KEY)
  }

}
