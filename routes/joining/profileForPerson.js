const ProfileForUserRouter = require('express').Router();
const ProfileForUserController = require('../../controller/joining/profileForPerson');

ProfileForUserRouter.route('/').post(ProfileForUserController.handleNewJoining);

module.exports = ProfileForUserRouter;
