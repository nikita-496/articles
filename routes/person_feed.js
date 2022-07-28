const feedRouter = require('express').Router();
const feedController = require('../controller/person_feed');

feedRouter
  .route('/')
  .get(feedController.handleAllFeed)
  .post(feedController.handleNewFeed)
  .put(feedController.handleUpdateFeed)

feedRouter
  .route('/:id')
  .get(feedController.handleOneFeed)

module.exports = feedRouter;