const personHelper = require('../utils/helper/person_helper');

const handleAllPersons = (req, res) => {
  personHelper.getAllPersons(res);
};

const handleOnePerson = (req, res) => {
  const id = req.params.id;
  personHelper.getOnePerson(id, res);
};

const handleDeletedPerson = (req, res) => {
  const id = req.params.id;
  personHelper.removePerson(id, res)
}

const handleUpdatedPerson = (req, res) => {
  console.log(req.body)
  const { id, name, surname, login, password, email } = req.body;
  personHelper.updatePerson({name, surname, login, password, email}, id, res)
}

module.exports = { handleAllPersons, handleOnePerson, handleDeletedPerson, handleUpdatedPerson };
