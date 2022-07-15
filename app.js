const express = require('express');
const app = express();
require('express-async-errors');

app.use(express.json());

app.use('/api/v1/person', require('./routes/person'));

module.exports = app;
