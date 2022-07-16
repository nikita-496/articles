const helper = require('../utils/helper/helper');

const TABLE = 'person'

const handleAllPersons = (req, res) => {
  helper.getAll(TABLE, res);
};

const handleOnePerson = (req, res) => {
  const id = req.params.id;
  helper.getOne(TABLE, id, res);
};

const handleDeletedPerson = (req, res) => {
  const id = req.params.id;
  helper.remove(TABLE, id, res)
}

const handleUpdatedPerson = (req, res) => {
  const { id, name, surname, login, password, email } = req.body;
  helper.updatePerson(TABLE, {name, surname, login, password, email}, id, res)
}

module.exports = { handleAllPersons, handleOnePerson, handleDeletedPerson, handleUpdatedPerson };
