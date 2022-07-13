require('dotenv').config();

const PORT = process.env.PORT;
const DB_NAME = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_DB_NAME 
  : process.env.DB_NAME;

module.exports = {
  PORT,
  DB_NAME,
};
