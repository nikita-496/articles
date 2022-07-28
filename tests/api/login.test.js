const supertest = require('supertest');
const app = require('../../app');
const helper = require('../test_person_helper');
const logger = require('../../utils/logger')
const api = supertest(app);

describe('a tests for the login process', () => {
  beforeEach(async () => {
    await helper.initializeDb();
  });
  test('when logging in, the registered person must receive an cookie jwt', async () => {
    const person = {
      login: 'Alex',
      password: 'A12345678',
    };

    let res = await api
      .post('/api/v1/login')
      .send(person)
      .expect('Content-Type', /application\/json/);

    expect(res.headers['set-cookie'][0]).toMatch(/jwt=/);
    expect(res.body.accessToken).not.toBeNull()
    expect(res.status).toEqual(200);

    res = JSON.parse(res.text)

    expect(res.login).toBe(person.login);

    logger.info(res.login, '- ВОШЕЛ В СИСТЕМУ')
    logger.info(res.accessToken, '- ТОКЕН ДЛЯ', res.login)
  });
});
