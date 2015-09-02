package controllers

import com.sigmoid.cloudplan.cluster.message.configuration.{AWSEC2ClusterConfiguration, GoogleComputeEngineClusterConfiguration}
import models.ClusterServices
import play.api.data.Form
import play.api.data.Forms._

/**
 * Created by ajay on 03/02/15.
 */

object Forms {

  val userForm = Form(
    tuple(
      "name" -> text,
      "role" -> text
    )
  )

  /*
  Form for parsing Cluster configuration input
   */
  val googleComputeEngineClusterConfigurationForm = Form(
    mapping(
      "name" -> nonEmptyText,
      "image" -> default(text, "backports-debian-7-wheezy-v20150309"),
      "region" -> default(text, "asia-east1-a"),
      "machine" -> default(text, "asia-east1-a/n1-standard-4"),
      "instances" -> default(number(min = 1), 4),
      "users" -> default(text, "Sigmoid"),
      "sshUser" -> optional(text),
      "network" -> default(text, "sigmoid-private"),
      "index" -> default(number, 0)
    )(GoogleComputeEngineClusterConfiguration.apply)(GoogleComputeEngineClusterConfiguration.unapply)
  )

  val awsEc2ClusterConfigurationForm = Form(
    mapping(
      "name" -> nonEmptyText,
      "image" -> default(text, "us-east-1/ami-baeda9d2"),
      "region" -> default(text, "us-east-1"),
      "machine" -> default(text, "m1.large"),
      "instances" -> default(number(min = 1), 4),
      "users" -> default(text, "Sigmoid"),
      "sshUser" -> optional(text),
      "spotPrice" -> optional(number),
      "diskSize" -> default(number, 10),
      "index" -> default(number, 0)
    )(AWSEC2ClusterConfiguration.apply)(AWSEC2ClusterConfiguration.unapply)
  )

  val mesosConfigurationForm = Form(
    mapping(
      "cluster" -> text,
      "masters" -> seq(text),
      "slaves" -> seq(text),
      "namenodes" -> seq(text),
      "datanodes" -> seq(text),
      "journalnodes" -> seq(text),
      "hmasters" -> seq(text),
      "regionservers" -> seq(text),
      "gmetads" -> seq(text),
      "gmonds" -> seq(text),
      "drivers" -> seq(text)
    )(ClusterServices.apply)(ClusterServices.unapply)
  )

  val resourceProviderForm = Form(
    single("provider" -> text)
  )
  
  /*
  Form for parsing cluster id to be terminated or restarted
   */
  val loadClusterForm = Form(
    tuple("provider" -> text, "name" -> text, "sshUser" -> text)
  )

  val restartNodeForm = Form(
    tuple("provider" -> text, "name" -> text, "node" -> text)
  )

  val terminateNodeForm = Form(
    tuple("provider" -> text, "name" -> text, "node" -> text)
  )

  val restartClusterForm = Form(
    tuple("provider" -> text, "name" -> text)
  )

  val terminateClusterForm = Form(
    tuple("provider" -> text, "name" -> text)
  )

  val clusterScriptForm = Form(
    tuple("provider" -> text, "name" -> text, "detail" -> text, "command" -> text, "user" -> text, "sshUser" -> text)
  )

  val nodeNameForm = Form(
    single("name" -> text)
  )

}
