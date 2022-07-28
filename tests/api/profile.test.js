const supertest = require('supertest');
const app = require('../../app');
const profileHelper = require('../test_profile_helper');
const logger = require('../../utils/logger');
const personHelper = require('../test_person_helper');
const api = supertest(app);

describe('a test for each route of the API', () => {
  beforeEach(async () => {
    await personHelper.initializeDb();
    await profileHelper.initializeDb();
  });

  describe('testing POST API', () => {
    test('one person profile instance must be created', async () => {
      // Создать новый профиль с пустым person_id
      let createdProfile = await api
        .post('/api/v1/profile')
        .expect(201)
        .expect('Content-Type', /application\/json/);

      createdProfile = JSON.parse(createdProfile.text);

      const profilesAtEnd = await profileHelper.checkProfilesInDb();

      expect(profilesAtEnd).toHaveLength(profileHelper.initialProfiles.length + 1);
      expect(createdProfile.user_id).toBeNull();
    });

    test('each profile must be assigned to a valid person', async () => {
      // Обновить профиль, обновив peroson_id
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

      const profileAtEnd = await profileHelper.checkProfilesInDb();

      expect(profileAtEnd).toHaveLength(profileHelper.initialProfiles.length);

      expect(updatedProfile.user_id).not.toBeNull();

      logger.info('ОБНОВЛЕННЫЙ ПРОФИЛЬ: ', updatedProfile);
    });
  });
});
