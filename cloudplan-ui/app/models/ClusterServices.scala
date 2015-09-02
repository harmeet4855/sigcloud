package models

import com.sigmoid.cloudplan.common.Queryable

/**
 * Created by ajay on 20/02/15.
 */

case class ClusterServices(cluster: String, masters: Seq[String], slaves: Seq[String], namenodes: Seq[String], datanodes: Seq[String], journalnodes: Seq[String], hmasters: Seq[String], regionservers: Seq[String], gmetads: Seq[String], gmonds: Seq[String], drivers: Seq[String]) extends Queryable