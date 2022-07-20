require('dotenv').config();

const PORT = process.env.PORT;
const PSW = process.env.PSW;
const DB_NAME = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_DB_NAME 
  : process.env.DB_NAME;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

module.exports = {
  PORT,
  PSW,
  DB_NAME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
};
