name := """cloudplan-ui"""

version := "1.1"

lazy val root = (project in file("."))
  .enablePlugins(PlayScala)

scalaVersion := "2.11.1"

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache,
  ws
)

// For akka
libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor" % "2.3.6",
  "com.typesafe.akka" %% "akka-testkit" % "2.3.6" % "test",
  "org.scalatest" %% "scalatest" % "2.1.6" % "test")

// Jclouds uses there libraries
libraryDependencies ++= Seq(
  "org.apache.jclouds.provider" % "aws-ec2" % "1.8.0",
  "org.apache.jclouds.labs" % "google-compute-engine" % "1.8.0",
  "org.apache.jclouds.driver" % "jclouds-sshj" % "1.8.0",
  "org.apache.jclouds.driver" % "jclouds-slf4j" % "1.8.0",
  "ch.qos.logback" % "logback-classic" % "1.0.7",
  "com.google.guava" % "guava" % "17.0",
  "com.google.code.findbugs" % "jsr305" % "1.3.9"
)

// For SORM
resolvers += "sorm Scala 2.11 fork" at "http://markusjura.github.io/sorm"

libraryDependencies ++= Seq(
  "org.sorm-framework" % "sorm" % "0.4.1",
  "com.h2database" % "h2" % "1.4.177"
//  "mysql" % "mysql-connector-java" % "5.1.21"
)
