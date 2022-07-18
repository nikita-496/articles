const helper = require('../utils/helper/helper');
const bcrypt = require('bcrypt');

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

const handleUpdatedPerson = async (req, res) => {
  let { id, name, surname, login, password, email } = req.body;
  password = await bcrypt.hash(password, 10);
  const updated = helper.updatePerson(TABLE, {name, surname, login, password, email, refresh_token: null}, id, res)
  res.json(updated)
}

module.exports = { handleAllPersons, handleOnePerson, handleDeletedPerson, handleUpdatedPerson };
