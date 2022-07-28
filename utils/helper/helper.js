const { Repository } = require('../../db/classes/Repository');
const Person = require('../../db/models/Person');
const Post = require('../../db/models/Post');
const Profile = require('../../db/models/Profile');
const PersonFeed = require('../../db/models/PersonFeed');
const Joiner = require('../../db/classes/Joiner');
const logger = require('../logger');
const { ExtraRepository } = require('../../db/classes/ExtraRepository');

const createNewPerson = async (table, registrationData, res) => {
  const columns = Object.keys(registrationData).join(',');
  const person = new Person(registrationData);

  logger.info('Данные регистрируемого пользователя:', person);
  const savedPerson = await Repository.save(table, columns, person);
  res.status(201).json(savedPerson);
  return savedPerson;
};

const createNewPost = async (table, data, res) => {
  const columns = Object.keys(data).join(',');
  const post = new Post(data);

  logger.info('Данные нового поста:', post);
  const savedPost = await Repository.save(table, columns, post);
  res.status(201).json(savedPost);
  return savedPost;
};

const createNewProfile = async (table, res) => {
  const savedProfile = await ExtraRepository.save(table);

  res.status(201).json(savedProfile);
  return savedProfile;
};

const createNewFeed = async (table, data, res) => {
  const columns = Object.keys(data).join(',');
  const feed = new PersonFeed(data);

  logger.info('Данные новой ленты пользователя:', feed);
  const savedFeed = await Repository.save(table, columns, feed);

  res.status(201).json(savedFeed);
  return savedFeed;
};

const getAll = async (table, res) => {
  const result = await Repository.getAll(table);
  res.json(result);
};

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

  logger.info('Данные для обновления пользователя:', person);
  return await Repository.update(table, id, columns, person);
};

const updatePost = async (table, updateData, id, res) => {
  const columns = Object.keys(updateData);
  const post = new Post(updateData);

  logger.info('Данные для обновления публикации:', post);
  const updated = await Repository.update(table, id, columns, post);
  res.json(updated);
};

const updateProfile = async (table, updateData, id) => {
  const columns = Object.keys(updateData);
  const profile = new Profile(updateData);

  logger.info('Данные для обновления профиля: ', profile);
  return await Repository.update(table, id, columns, profile);
}

const updateFeed = async (table, updateData, id) => {
  const columns = Object.keys(updateData);
  const feed = new PersonFeed(updateData); 

  logger.info('Данные для обновления ленты: ', feed);
  return await Repository.update(table, id, columns, feed);
}

const joinToPerson = async (data, res) => {
  const { valueToJoing } = data
  const joined = await Joiner.joinWithPerson(valueToJoing)
  res.status(201).json(joined);
  return joined;
};

const joinToProfile = async (data, res) => {
  const { valueToJoing } = data
  const joined = await Joiner.joinWithProfile(valueToJoing)
  res.status(201).json(joined);
  return joined;
};

module.exports = {
  createNewPerson,
  createNewPost,
  createNewProfile,
  createNewFeed,
  getAll,
  getOne,
  remove,
  updatePerson,
  updatePost,
  updateProfile,
  updateFeed,
  joinToPerson,
  joinToProfile
};
