const express = require('express');
const app = express();
const cors = require('cors')
require('express-async-errors');

const middlewareError = require('./utils/middleware/error_handler.js');
const cookieParser = require('cookie-parser');

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/login', require('./routes/login'));
app.use('/api/v1/refresh', require('./routes/refresh'));
app.use('/api/v1/logout', require('./routes/logout'));


app.use('/api/v1/post', require('./routes/post'));

app.use('/api/v1/person', require('./routes/person'));

app.use(middlewareError.errorHandler);

module.exports = app;
