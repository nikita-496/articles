const db = require ('../db')

class ExplorerPerson {
  static async selectLogin(login) {
    const result =  await db.query("SELECT login FROM person WHERE login = " + "'" + login + "'");
    return result.rows
  }
  static async selectEmail(email) {
    const result =  await db.query("SELECT email FROM person WHERE email = " + "'" + email + "'");
    return result.rows
  }
}

module.exports = ExplorerPerson