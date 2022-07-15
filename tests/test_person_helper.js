const db = require('../db/db');
const Person = require('../db/model/Person');

const initialPersons = [
  {
    name: 'Alexandr',
    surname: 'Pushkin',
    login: 'Alex',
    password: 'Alex',
    email: 'alex@gmail.com',
  },
  {
    name: 'Michael',
    surname: 'Lermontov',
    login: 'Micha',
    password: 'Micha',
    email: 'micha@gmail.com',
  },
];

const initializeDb = async () => {
  await db.query('DELETE FROM person;');

  const personObjects = initialPersons.map((person) => new Person(person));
  const promiseArray = personObjects.map(async (person) => {
    const { name, surname, login, password, email } = person;
    await db.query(
      'INSERT INTO person (name, surname, login, password, email) values ($1,$2,$3,$4,$5) RETURNING *',
      [name, surname, login, password, email]
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
