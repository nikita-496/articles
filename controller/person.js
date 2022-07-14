const personHelper = require('../utils/helper/person_helper');

const handlePersons = async (req, res) => {
  personHelper.getAllPersons(res)
}

module.exports = { handlePersons }