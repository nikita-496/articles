// Протестировать полный цикл этапа регистрации пользователя
// от обработки введенных данных до присвоения пользователю ленты событий

const supertest = require('supertest');
const app = require('../../app');
const personHelper = require('../test_person_helper');
const profileHelper = require('../test_profile_helper');
const feedHelper = require('../test_person_feed_helper');
const logger = require('../../utils/logger');
const api = supertest(app);

describe('person registration test', () => {
  beforeEach(async () => {
    await personHelper.initializeDb();
    await profileHelper.initializeDb();
    await feedHelper.initializeDb();
  });

  test('the registered person must go through the entire cycle of creating a new person', async () => {

    // Создать нового пользователя
    const registeredPerson = {
      name: 'Fedor',
      surname: 'Dostoyevsky',
      login: 'Fedoro',
      password: 'F12345678',
      email: 'fedoro@gmail.com',
    };

    let newPerson = await api
      .post('/api/v1/person')
      .send(registeredPerson)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    newPerson = JSON.parse(newPerson.text);

    const personsAtEnd = await personHelper.checkPersonsInDb();

    expect(personsAtEnd).toHaveLength(personHelper.initialPersons.length + 1);

    logger.info('ЗАРЕГИСТРИРОВАННЫЙ ПОЛЬЗОВАТЕЛЬ', newPerson);

    // Создать новый профиль с пустым person_id
    let createdProfile = await api
      .post('/api/v1/profile')
      .expect(201)
      .expect('Content-Type', /application\/json/);

    createdProfile = JSON.parse(createdProfile.text);

    const profilesAtEnd = await profileHelper.checkProfilesInDb();

    expect(profilesAtEnd).toHaveLength(profileHelper.initialProfiles.length + 1);
    expect(createdProfile.user_id).toBeNull();

    logger.info('СОЗДАННЫЙ ПРОФИЛЬ', createdProfile);

    // Обновить профиль, обновив person_id
    const personAtStart = await personHelper.checkPersonsInDb();
    const lastPerson = personAtStart[personAtStart.length - 1];

    const profileAtStart = await profileHelper.checkProfilesInDb();
    const lastProfileToUpdate = profileAtStart[profileAtStart.length - 1];

    let updatedProfile = await api
      .put('/api/v1/profile')
      .send({ id: lastProfileToUpdate.id, user_id: lastPerson.id })
      .expect(200)
      .expect('Content-Type', /application\/json/);
    updatedProfile = JSON.parse(updatedProfile.text);

    expect(updatedProfile.user_id).not.toBeNull();

    logger.info('ОБНОВЛЕННЫЙ ПРОФИЛЬ: ', updatedProfile);

    // Создать новую ленту в профиле для нового пользователя с пустым profile_id
    let createdFeed = await api
      .post('/api/v1/feed')
      .expect(201)
      .expect('Content-Type', /application\/json/);

    createdFeed = JSON.parse(createdFeed.text);

    const FeedsAtEnd = await feedHelper.checkFeedInDb();

    expect(FeedsAtEnd).toHaveLength(feedHelper.initialPersonFeed.length + 1);
    expect(createdFeed.profile_id).toBeNull();

    logger.info('СОЗДАННАЯ ЛЕНТА', createdFeed);

    // Обновить ленту в профиле для пользователя, обновив profile_id
    const pAtStart = await profileHelper.checkProfilesInDb();
    const lProfileToUpdate = pAtStart[pAtStart.length - 1];

    const feedAtStart = await feedHelper.checkFeedInDb();
    const lastFeedToUpdate = feedAtStart[feedAtStart.length - 1];


    let updatedFeed = await api
      .put('/api/v1/feed')
      .send({
        id: lastFeedToUpdate.id,
        profile_id: lProfileToUpdate.id,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
    updatedFeed = JSON.parse(updatedFeed.text);

    expect(updatedFeed.profile_id).not.toBeNull();

    logger.info('ОБНОВЛЕННАЯ ЛЕНТА: ', updatedFeed);
  });
});
