const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_person_helper');
const api = supertest(app);

describe('a tests for the login process', () => {
  beforeEach(async () => {
    await helper.initializeDb();
  });
  test('when logging in, the registered person must receive an cookie jwt', async () => {
    const person = {
      login: 'Alex',
      password: 'Alex',
    };

    const res = await api
      .post('/api/v1/login')
      .send(person)
      .expect('Content-Type', /application\/json/);

    expect(res.headers['set-cookie'][0]).toMatch(/jwt=/);
    expect(res.body.accessToken).not.toBeNull()
    expect(res.status).toEqual(200);
  });
});
