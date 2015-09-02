package messages.database

import com.sigmoid.cloudplan.common.Queryable
import sorm.Persisted

/**
 * Created by ajay on 18/02/15.
 */

case class DatabaseCollection[T <: Queryable](list: List[T with Persisted], resource: Class[T])
