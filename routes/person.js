const personRouter = require('express').Router();
const registerController = require('../controller/register');
const personController = require('../controller/person');

personRouter
  .route('/')
  .post(registerController.handleNewPerson)
  .get(personController.handleAllPersons)
  .put(personController.handleUpdatedPerson)

personRouter
  .route('/:id')
  .get(personController.handleOnePerson)
  .delete(personController.handleDeletedPerson);

module.exports = personRouter;
