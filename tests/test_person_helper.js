const db = require('../db/db');
const bcrypt = require('bcrypt');
const Person = require('../db/model/Person');

const initialPersons = [
  {
    name: 'Alexandr',
    surname: 'Pushkin',
    login: 'Alex',
    password: 'Alex',
    email: 'alex@gmail.com',
    refresh_token: null
  },
  {
    name: 'Michael',
    surname: 'Lermontov',
    login: 'Micha',
    password: 'Micha',
    email: 'micha@gmail.com',
    refresh_token: null
  },
];

const initializeDb = async () => {
  await db.query('DELETE FROM person;');

  const personObjects = initialPersons.map((person) => new Person(person));
  const promiseArray = personObjects.map(async (person) => {
    let { name, surname, login, password, email,  refresh_token} = person;
    password = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO person (name, surname, login, password, email, refresh_token) values ($1,$2,$3,$4,$5,$6) RETURNING *',
      [name, surname, login, password, email, refresh_token]
    );
  });
  await Promise.all(promiseArray);
};

const checkPersonsInDb = async (table) => {
  const persons = await db.query('SELECT * FROM ' + table);
  return persons.rows;
};

module.exports = {
  initialPersons,
  initializeDb,
  checkPersonsInDb,
};
