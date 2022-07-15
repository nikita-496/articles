const personHelper = require('../utils/helper/person_helper');

const handleAllPersons = (req, res) => {
  personHelper.getAllPersons(res);
};

const handleOnePerson = (req, res) => {
  const id = req.params.id;
  personHelper.getOnePerson(id, res);
};

const handleDeletedPerson = async (req, res) => {
  const id = req.params.id;
  await personHelper.removePerson(id, res)
  //res.json(`Person with id ${req.params.id} deleted`);
  res.status(204).end();
}

module.exports = { handleAllPersons, handleOnePerson, handleDeletedPerson };
