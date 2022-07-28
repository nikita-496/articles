const db = require('../db/db');
const Profile = require('../db/models/Profile');

const initialProfiles = [
  {user_id: null},
  {user_id: null},
];

const initializeDb = async () => {
  await db.query('DELETE FROM profile;');

  const profileObjects = initialProfiles.map((profile) => new Profile(profile));
  const promiseArray = profileObjects.map(async () => {
    await db.query(
      'INSERT INTO profile default values RETURNING *',
    );
  });
  await Promise.all(promiseArray);
};


const checkProfilesInDb = async () => {
  const profiles = await db.query('SELECT * FROM ' + 'profile');
  return profiles.rows;
};

module.exports = {
  initialProfiles,
  initializeDb,
  checkProfilesInDb,
};
