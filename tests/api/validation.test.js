const supertest = require('supertest');
const app = require('../../app');
const helper = require('../test_person_helper');
const api = supertest(app);

describe('a tests for the validation process', () => {
  beforeEach(async () => {
    await helper.initializeDb();
  });

  describe("verification testing of the person's name field", () => {
    test('if the name length is more than 50, there should be an appropriate error', async () => {
      const newPerson = {
        name: 'Fedordedordedorvedorvedorsedoradororfddfdfdfdedoredorfsfsfsfedor',
        surname: 'Dostoyevsky',
        login: 'Fedoro',
        password: 'Fedoro',
        email: 'fedoro@gmail.com',
      };

      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(400)
        .expect('{"error":"Имя должно быть не более 50 символов"}');
    });

    test('if the name has multiple capital letters, there should be an appropriate error', async () => {
      const newPerson = {
        name: 'FeDor',
        surname: 'Dostoyevsky',
        login: 'Fedoro',
        password: 'Fedoro',
        email: 'fedoro@gmail.com',
      };
      
      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(400)
        .expect('{"error":"Заглавная буква только первая"}');
    });

    test('if the name consists of characters other than latin letters and cyrillic, there should be an appropriate error', async () => {
      const newPerson = {
        name: 'Fedor1',
        surname: 'Dostoyevsky',
        login: 'Fedoro',
        password: 'Fedoro',
        email: 'fedoro@gmail.com',
      };
      
      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(400)
        .expect('{"error":"Имя должно состоять из букв латинского алфавита или кириллицы"}');
    });

    test('if the name does not start with a capital letter, there should be an appropriate error', async () => {
      const newPerson = {
        name: 'fedor',
        surname: 'Dostoyevsky',
        login: 'Fedoro',
        password: 'Fedoro',
        email: 'fedoro@gmail.com',
      };
      
      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(400)
        .expect('{"error":"Имя должно начинаться с заглавной буквы"}');
    });
  });

  describe("verification testing of the person's surname field", () => {
    test('if the surname length is more than 50, there should be an appropriate error', async () => {
      const newPerson = {
        name: 'Fedor',
        surname: 'DostoyevskyDostoyevskyDostoyevskyDostoyevskyDostoyevskyDostoyevskyDostoyevskyDostoyevsky',
        login: 'Fedoro',
        password: 'Fedoro',
        email: 'fedoro@gmail.com',
      };

      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(400)
        .expect('{"error":"Фамилия должна быть не более 50 символов"}');
    });

    test('if the surname has multiple capital letters, there should be an appropriate error', async () => {
      const newPerson = {
        name: 'Fedor',
        surname: 'DostoYevsky',
        login: 'Fedoro',
        password: 'Fedoro',
        email: 'fedoro@gmail.com',
      };
      
      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(400)
        .expect('{"error":"Заглавная буква только первая"}');
    });

    test('if the surname consists of characters other than latin letters and cyrillic, there should be an appropriate error', async () => {
      const newPerson = {
        name: 'Fedor',
        surname: 'Dostoevsky!',
        login: 'Fedoro',
        password: 'Fedoro',
        email: 'fedoro@gmail.com',
      };
      
      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(400)
        .expect('{"error":"Фамилия должна состоять из букв латинского алфавита или кириллицы"}');
    });

    test('if the surname does not start with a capital letter, there should be an appropriate error', async () => {
      const newPerson = {
        name: 'Fedor',
        surname: 'dostoevsky',
        login: 'Fedoro',
        password: 'Fedoro',
        email: 'fedoro@gmail.com',
      };
      
      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(400)
        .expect('{"error":"Фамилия должна начинаться с заглавной буквы"}');
    });
  });

  describe("verification testing of the person's login field", () => {
    test('if the login length is more than 50, there should be an appropriate error', async () => {
      const newPerson = {
        name: 'Fedor',
        surname: 'Dostoevsky',
        login: 'FedoroFedoroFedoroFedoroFedoroFedoroFedoroFedoroFedoroFedoroFedoroFedoroFedoroFedoro',
        password: 'Fedoro',
        email: 'fedoro@gmail.com',
      };
      
      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(400)
        .expect('{"error":"Логин должен быть не более 50 символов"}');
    });

    test('if the login starts with numbers, an appropriate error should appear', async () => {
      const newPerson = {
        name: 'Fedor',
        surname: 'Dostoevsky',
        login: '13Fedoro',
        password: 'Fedoro',
        email: 'fedoro@gmail.com',
      };
      
      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(400)
        .expect('{"error":"Логин не должен начинаться с цифр"}');
    });

    test('if the login contains spaces and special characters, an appropriate error should appear', async () => {
      const newPerson = {
        name: 'Fedor',
        surname: 'Dostoevsky',
        login: 'Fedoro%',
        password: 'Fedoro',
        email: 'fedoro@gmail.com',
      };
      
      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(400)
        .expect('{"error":"Логин не должен содержать пробелы, специальные символы: !, @, #, $, %, :, ^, &, *, ?, /, =, +, -, (, ), ;, №"}');
    });

    test('if the login is already in use, an appropriate error should appear', async () => {
      const newPerson = {
        name: 'Fedor',
        surname: 'Dostoevsky',
        login: 'Alex',
        password: 'Fedoro',
        email: 'fedoro@gmail.com',
      };
      
      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(400)
        .expect('{"error":"Логин занят"}');
    });
    
  });

  describe("verification testing of the person's password field", () => {
    test('if the password is less than 8 characters, an appropriate error should appear', async () => {
      const newPerson = {
        name: 'Fedor',
        surname: 'Dostoevsky',
        login: 'Fedoro',
        password: 'Fedoro',
        email: 'fedoro@gmail.com',
      };
      
      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(400)
        .expect('{"error":"Пароль долнжен быть не менее 8 символов"}');
    });

    test('if the password is less than 8 characters, an appropriate error should appear', async () => {
      const newPerson = {
        name: 'Fedor',
        surname: 'Dostoevsky',
        login: 'Fedoro',
        password: '12345678',
        email: 'fedoro@gmail.com',
      };
      
      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(400)
        .expect('{"error":"Пароль должен содержать минимум 1 буквенный символ"}');
    });
  });

  describe("verification testing of the person's email field", () => {
    test('if the email is already in use, an appropriate error should appear', async () => {
      const newPerson = {
        name: 'Fedor',
        surname: 'Dostoevsky',
        login: 'Fedoro',
        password: 'Fedoro21',
        email: 'alex@gmail.com',
      };
      
      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(400)
        .expect('{"error":"Email занят"}');
    });

    test('if the email is not in the correct format, an appropriate error should appear', async () => {
      const newPerson = {
        name: 'Fedor',
        surname: 'Dostoevsky',
        login: 'Fedoro',
        password: 'Fedoro21',
        email: 'fedoro*gmail.com',
      };
      
      await api
        .post('/api/v1/person')
        .send(newPerson)
        .expect(400)
        .expect('{"error":"Email неверного формата"}');
    });
  });
});
