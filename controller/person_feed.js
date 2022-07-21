const helper = require('../utils/helper/helper')
const Timer = require('../db/classes/Timer')
const TABLE = 'user_feed'

const handleNewFeed  = async (req, res) => {
  const { profile_id} = req.body
  helper.createNewFeed(TABLE, {date:  await Timer.setDate(), time: await Timer.setTime(), profile_id, content: ['Нет активности']}, res)
}

const handleAllFeed = (req, res) => {
  helper.getAll(TABLE, res);
};

const handleOneFeed = (req, res) => {
  const id = req.params.id
  helper.getOne(TABLE, id, res)
}

module.exports = { handleNewFeed, handleAllFeed, handleOneFeed }