const db = require('../db/db');
const PersonFeed = require('../db/models/PersonFeed');
//const personHelper = require('./test_person_helper')

const initialPersonFeed = [
  {
    date: '22.07.2022', 
    time:  '18:57:40',
    profile_id: null,
    content: ['Нет активности']
  },
];

const initializeDb = async () => {

  await db.query('DELETE FROM user_feed;');

  const feedObjects = initialPersonFeed.map((feed) => new PersonFeed(feed));
  const promiseArray = feedObjects.map(async (feed) => {
    let { date, time, content } = feed;
    await db.query(
      'INSERT INTO user_feed (date, time, content) values ($1,$2,$3) RETURNING *',
      [date, time,  content]
    );
  });
  await Promise.all(promiseArray);
};

const checkFeedInDb = async () => {
  const feeds = await db.query('SELECT * FROM ' + 'user_feed');
  return feeds.rows;
};

module.exports = {
  initialPersonFeed,
  initializeDb,
  checkFeedInDb
};