const express = require('express');
const app = express();
require('express-async-errors');

const middleware = require('./utils/middleware/error_handler.js')

app.use(express.json());

app.use('/api/v1/person', require('./routes/person'));
app.use('/api/v1/post', require('./routes/post'))

app.use(middleware.errorHandler)

module.exports = app;
