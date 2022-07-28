const db = require ('../db')

class Joiner {
  static async joinWithPerson(valueToJoing) {
    const result = await db.query(`SELECT profile.id, profile.user_id, person.name, person.surname, person.login, person.password, person.email FROM PERSON INNER JOIN profile ON person.id = profile.user_id WHERE person.id = ${valueToJoing}`)
    return result.rows
  }
  static async joinWithProfile(valueToJoing) {
    const result = await db.query(`SELECT user_feed.profile_id, user_feed.date, user_feed.time, user_feed.content FROM profile INNER JOIN user_feed ON profile.id = user_feed.profile_id  WHERE profile.id = ${valueToJoing}`)
    return result.rows
  }
}

module.exports = Joiner 