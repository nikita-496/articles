const supertest = require('supertest');
const app = require('../../app');
const logger = require('../../utils/logger');
const api = supertest(app);

// Запускать тест в связке с полным циклом регистрации (/flow/regiter.test.js)
describe('a tests for the join process', () => {
  test('joing', async () => {
    let res = await api
      .post('/api/v1/joing')
      .send()
      .expect(201)
      .expect('Content-Type', /application\/json/);

    res = JSON.parse(res.text);

    logger.info('СКЛЕННАЯ ТАБЛИЦА ПРОФИЛЯ С ПОЛЬЗОВАТЕЛЕМ-', res);
  });
});

