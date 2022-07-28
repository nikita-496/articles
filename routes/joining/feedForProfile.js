const feedForProfileRouter = require('express').Router();
const feedForProfileController = require('../../controller/joining/personFeedFroProfile');

feedForProfileRouter.route('/').post(feedForProfileController.handleNewJoining);

module.exports = feedForProfileRouter;
