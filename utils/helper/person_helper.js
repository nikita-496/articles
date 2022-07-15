const { Repository } = require('../../db/classes/Repository');
const Person = require('../../db/model/Person');
const logger = require('../logger');

const TABLE = 'person';

// Проверить наличие на дублирования логина регистрируемго пользователя с существующими в бд
/*const checkLogin = (registeredLogin) => {
  // создать класс (как Repository), который будет искать в бд
  // сущности(пользователей, блоги и т.д.)
  // по определенному запросу
  // 1. создать объект на основе класса, описанного выше
  // 2. использовать метод объекта для поиска логина
  // в таблице person
  // 3. логин есть ?
  // 4. вызвать ошибку - 409
  // 5. иначе выйти из программы
};*/

const createNewPerson = async (registrationData, res) => {
  const columns = Object.keys(registrationData).join(',');
  const person = new Person(registrationData);

  logger.info('Регистрируемый пользователь:', person);
  const savedPerson = await Repository.save(TABLE, columns, person);
  res.status(201).json(savedPerson);
  return savedPerson;
};

const getAllPersons = (res) => {
  Repository.getAll(TABLE, res);
};

const getOnePerson = (id, res) => {
  Repository.getOne(TABLE, id, res);
};

const removePerson = async (id, res) => {
  await Repository.remove(TABLE, id);
  res.status(204).end();
};

const updatePerson = async (updateData, id, res) => {
  const columns = Object.keys(updateData);
  const person = new Person(updateData);

  logger.info('Обновленный пользователь:', person);
  const updated = await Repository.update(TABLE, id, columns, person, res);
  res.json(updated);
};

module.exports = {
  createNewPerson,
  getAllPersons,
  getOnePerson,
  removePerson,
  updatePerson,
};
