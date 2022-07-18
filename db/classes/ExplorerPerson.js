const db = require ('../db');

class ExplorerPerson{
  static async selectById(id) {
    const result =  await db.query("SELECT * FROM person WHERE id = " + "'" + id + "'");
    return result.rows
  }
  static async selectByLogin(login) {
    const result =  await db.query("SELECT * FROM person WHERE login = " + "'" + login + "'");
    return result.rows[0]
  }
  static async selectEmail(email) {
    const result =  await db.query("SELECT email FROM person WHERE email = " + "'" + email + "'");
    return result.rows
  }
  static async selectByRefreshToken(refreshToken) {
    const result =  await db.query("SELECT * FROM person WHERE refresh_token = " + "'" + refreshToken + "'");
    return result.rows[0]
  }
}

module.exports = ExplorerPerson