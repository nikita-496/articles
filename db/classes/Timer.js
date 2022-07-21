const db = require('../db')

class Timer {
  static async setDate () {
    const date = await db.query(
      "SELECT TO_CHAR(NOW() :: DATE, 'Mon dd, yyyy')"
    );
    console.log(date)
    return date.rows[0].to_char
  }
 
  static async setTime () {
    const time = await db.query("SELECT LOCALTIMESTAMP(0) :: TIME");
    console.log(time)
    return time.rows[0].localtimestamp
  }
}

module.exports = Timer