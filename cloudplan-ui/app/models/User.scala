package models

import com.sigmoid.cloudplan.common.Queryable

/**
 * Created by ajay on 21/02/15.
 */

case class User(uid: String, name: String, role: String) extends Queryable

object User {
  object Role extends Enumeration {
    type Role = Value
    val Admin = Value("admin")
    val Developer = Value("developer")
  }
}
