const helper = require('../utils/helper/helper')
const TABLE = 'profile'

const handleNewProfile = (req, res) => {
  helper.createNewProfile(TABLE, res)
}

const handleAllProfile = (req, res) => {
  helper.getAll(TABLE, res);
};

const handleOneProfile = (req, res) => {
  const id = req.params.id
  helper.getOne(TABLE, id, res)
}

const handleUpdatedProfile = async (req, res) => {
  let { id, user_id } = req.body;
  const updated = await helper.updateProfile(TABLE, { user_id }, id)
  res.json(updated)
}

module.exports = { handleNewProfile, handleOneProfile, handleAllProfile, handleUpdatedProfile }