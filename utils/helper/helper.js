const { Repository } = require('../../db/classes/Repository');
const Person = require('../../db/models/Person');
const Post = require('../../db/models/Post');
const Profile = require('../../db/models/Profile');
const logger = require('../logger');

const createNewPerson = async (table, registrationData, res) => {
  const columns = Object.keys(registrationData).join(',');
  const person = new Person(registrationData);

  logger.info('Регистрируемый пользователь:', person);
  const savedPerson = await Repository.save(table, columns, person);
  res.status(201).json(savedPerson);
  return savedPerson;
};

const createNewPost = async (table, data, res) => {
  const columns = Object.keys(data).join(',');
  const post = new Post(data);

  logger.info('Новый пост:', post);
  const savedPost = await Repository.save(table, columns, post);
  res.status(201).json(savedPost);
  return savedPost;
};

const createNewProfile = async (table, data, res) => {
  const columns = Object.keys(data).join(',');
  const profile = new Profile(data);

  logger.info('Новый профиль:', profile);
  const savedProfile = await Repository.save(table, columns, profile);
  res.status(201).json(savedProfile);
  return savedProfile;
}

const getAll = (table, res) => Repository.getAll(table, res);

const getOne = (table, id, res) => {
  Repository.getOne(table, id, res);
};

const remove = async (table, id, res) => {
  await Repository.remove(table, id);
  res.status(204).end();
};

const updatePerson = async (table, updateData, id) => {
  const columns = Object.keys(updateData);
  const person = new Person(updateData);

  logger.info('Обновленный пользователь:', person);
  return await Repository.update(table, id, columns, person);
};

const updatePost = async (table, updateData, id, res) => {
  const columns = Object.keys(updateData);
  const post = new Post(updateData);

  logger.info('Обновленная публикация:', post);
  const updated = await Repository.update(table, id, columns, post, res);
  res.json(updated);
};

module.exports = {
  createNewPerson,
  createNewPost,
  createNewProfile,
  getAll,
  getOne,
  remove,
  updatePerson,
  updatePost,
};
