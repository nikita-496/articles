const supertest = require('supertest');
const app = require('../../app');
const helper = require('../test_person_helper');
const logger = require('../../utils/logger');
const api = supertest(app);

describe('a test for each route of the API', () => {
  beforeEach(async () => {
    await helper.initializeDb();
  });

  describe('testing GET API', () => {
    test('persons are returned as json', async () => {
      await api
        .get('/api/v1/person')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
    test('all persons are returned', async () => {
      const res = await api.get('/api/v1/person');

      expect(res.body).toHaveLength(helper.initialPersons.length);
    });
    test('a specific person can be viewed', async () => {
      const personAtStart = await helper.checkPersonsInDb('person');
      const personToView = personAtStart[0];

      const resultPerson = await api
        .get(`/api/v1/person/${personToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);


      expect(resultPerson.body).toEqual([personToView]);
    });
  });

  describe('testing POST API', () => {
    test('a valid person can be registered', async () => {
      const newPerson = {
        name: 'Fedor',
        surname: 'Dostoyevsky',
        login: 'Fedoro',
        password: 'Fedoro',
        email: 'fedoro@gmail.com',
      };

      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const personsAtEnd = await helper.checkPersonsInDb('person');
      expect(personsAtEnd).toHaveLength(helper.initialPersons.length + 1);

      const loginPersons = personsAtEnd.map((p) => p.login);

      expect(loginPersons).toContain('Fedoro');

      logger.info('expected', personsAtEnd.length, 'received', helper.initialPersons.length + 1);
      logger.info('Fedoro is includes - ' + loginPersons.includes('Fedoro'));
    });
  });
});
