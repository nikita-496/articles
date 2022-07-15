const { Repository } = require('../../db/classes/Repository');
const Person = require('../../db/model/Person');
const logger = require('../logger');

const TABLE = 'person';

const createNewPerson = async (registrationData, res) => {
  const columns = Object.keys(registrationData).join(',');
  const person = new Person(registrationData);

  logger.info('Регистрируемый пользователь:', person);
  const savedPerson = await Repository.save(TABLE, columns, person);
  res.status(201).json(savedPerson);
  return savedPerson;
};

const getAllPersons = (res) => Repository.getAll(TABLE, res);

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
