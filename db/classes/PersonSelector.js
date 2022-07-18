const Person = require('../model/Person');
const ExplorerPerson = require('./ExplorerPerson');

class PersonSelector extends Person {
  constructor(name = null, surname = null, login = null, password = null, email = null, refresh_token = null) {
    super({ name, surname, login, password, email });
    //this.selector = ExplorerPerson.selectByLogin(login);
    this.name = name;
    this.surname = surname;
    this.password = password;
    this.email = email;
    this.refresh_token = refresh_token;
  }

  set _name(val) {
    console.log(123);
    this.name = val;
  }
  set _surname(val) {
    console.log(123);
    this.surname = val;
  }
  set _password(val) {
    console.log(123);
    this.password = val;
  }
  set _email(val) {
    console.log(123);
    this.email = val;
  }
  get refreshToken() {
    return this.refresh_token;
  }
  set refreshToken(val) {
    console.log(123);
    this.refresh_token = val;
  }
  async a(login) {
    const explorer = await ExplorerPerson.selectByLogin(login);
    this._name = explorer.name
    this._surname = explorer.surname
    this._password = explorer.password
  }
}

module.exports = PersonSelector;
