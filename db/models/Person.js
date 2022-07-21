class Person {
  constructor({name, surname, login, password, email, refresh_token}) {
    this.name = name
    this.surname = surname
    this.login = login
    this.password = password
    this.email = email
    this.refresh_token = refresh_token
  }
}

module.exports = Person
