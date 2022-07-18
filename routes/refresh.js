const refreshRouter = require('express').Router();
const refreshController = require('../controller/refreshToken');


refreshRouter
  .route('/')
  .get(refreshController.handleRefreshToken)

module.exports = refreshRouter;