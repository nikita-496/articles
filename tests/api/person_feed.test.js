const supertest = require('supertest');
const app = require('../../app');
const helper = require('../test_person_feed_helper');
const profileHelper = require('../test_profile_helper');
const logger = require('../../utils/logger');
const api = supertest(app);

describe('a test for each route of the API', () => {
  beforeEach(async () => {
    await helper.initializeDb();
    await profileHelper.initializeDb();
  });

  describe('testing POST API', () => {
    test('one person feed instance must be created', async () => {
      await api
        .post('/api/v1/feed')
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const feedsAtEnd = await helper.checkFeedInDb();
      expect(feedsAtEnd).toHaveLength(helper.initialPersonFeed.length + 1);

      logger.info(
        'for two person expected',
        feedsAtEnd.length,
        'received',
        helper.initialPersonFeed.length + 1
      );
    });
  });

  test('each person must have one feed', async () => {
    const profileAtStart = await profileHelper.checkProfilesInDb();
    const lastProfileToUpdate = profileAtStart[profileAtStart.length - 1];

    const feedAtStart = await helper.checkFeedInDb();
    const lastFeedToUpdate = feedAtStart[feedAtStart.length - 1];

    logger.info(lastProfileToUpdate, lastFeedToUpdate);

    let updatedFeed = await api
      .put('/api/v1/feed')
      .send({
        id: lastFeedToUpdate.id,
        profile_id: lastProfileToUpdate.id,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
    updatedFeed = JSON.parse(updatedFeed.text);

    expect(updatedFeed.profile_id).not.toBeNull();

    logger.info('ОБНОВЛЕННАЯ ЛЕНТА: ', updatedFeed);
  });
});
