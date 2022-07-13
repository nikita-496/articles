const Pool = require("pg").Pool;
const password = require("../config/password");
const config = require("../utils/config")

const pool = new Pool({
  user: "postgres",
  password,
  host: "localhost",
  port: 5432,
  database: config.DB_NAME,
});

module.exports = pool;