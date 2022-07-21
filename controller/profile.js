const helper = require('../utils/helper/helper')
const TABLE = 'profile'

const handleNewProfile  = (req, res) => {
  const {user_id} = req.body
  helper.createNewProfile(TABLE, {user_id}, res)
}

const handleAllProfile = (req, res) => {
  helper.getAll(TABLE, res);
};

const handleOneProfile = (res, req) => {
  const id = req.params.id
  helper.getOne(TABLE, id, res)
}

module.exports = { handleNewProfile, handleOneProfile, handleAllProfile }