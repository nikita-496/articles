const personHelper = require('../utils/helper/person_helper');

const handleAllPersons = (req, res) => {
  personHelper.getAllPersons(res);
};

const handleOnelPerson = (req, res) => {
  const id = req.params.id;
  personHelper.getOnePerson(id, res);
};

module.exports = { handleAllPersons, handleOnelPerson };
