package models

import com.sigmoid.cloudplan.common.resources._
import sorm.{Entity, InitMode, Instance}

/**
 * Created by ajay on 31/01/15.
 */

object DB extends Instance (
  entities = Set(
    Entity[Node](unique = Set() + Seq("name")),
    Entity[Cluster](unique = Set() + Seq("name")),
    Entity[Image](unique = Set() + Seq("name")),
    Entity[Hardware](unique = Set() + Seq("name")),
    Entity[Region](unique = Set() + Seq("name")),
    Entity[ClusterServices](unique = Set() + Seq("cluster")),
    Entity[User](unique = Set() + Seq("name"))
  ),
  url = "jdbc:h2:mem:play",
//  url = "jdbc:mysql://146.148.62.84/playdb",
//  user = "root",
//  password = "Sigmoid!@#",
  initMode = InitMode.Create
)