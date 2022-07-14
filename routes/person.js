const personRouter = require('express').Router();
const registerController = require('../controller/register');
const personController = require('../controller/person');

personRouter
  .route('/')
  .post(registerController.handleNewPerson)
  .get(personController.handleAllPersons);

personRouter
  .route('/:id')
  .get(personController.handleOnelPerson)

module.exports = personRouter;
