const Pool = require("pg").Pool;
const config = require("../utils/config")

const pool = new Pool({
  user: "postgres",
  password: config.PSW,
  host: "localhost",
  port: 5432,
  database: config.DB_NAME,
});

module.exports = pool;