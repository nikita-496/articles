const { Repositiory } = require('../../db/classes/Repository');
const db = require('../../db/db');

describe('save method behavior', () => {
  const save = Repositiory.save;

  const initialPerson = [
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

  // Инициализация базы данных перед тестами
  // Гарантия, что база данных находится в одном и том же состоянии перед запуском каждого теста.
  beforeEach(async () => {
    await db.query('DELETE FROM person;');

    {
      const { name, surname, login, password, email } = initialPerson[0];
      await db.query(
        'INSERT INTO person (name, surname, login, password, email) values ($1,$2,$3,$4,$5) RETURNING *',
        [name, surname, login, password, email]
      );
    }

    {
      const { name, surname, login, password, email } = initialPerson[1];
      await db.query(
        'INSERT INTO person (name, surname, login, password, email) values ($1,$2,$3,$4,$5) RETURNING *',
        [name, surname, login, password, email]
      );
    }
  });

});
