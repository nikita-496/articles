const logoutRouter = require('express').Router();
const logoutController = require('../controller/logout');


logoutRouter
  .route('/')
  .get(logoutController.handleLogout)

module.exports = logoutRouter;