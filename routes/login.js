const loginRouter = require('express').Router();
const loginController = require('../controller/login');


loginRouter
  .route('/')
  .post(loginController.handleLogin)

module.exports = loginRouter;
