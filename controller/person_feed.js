const helper = require('../utils/helper/helper')
const Timer = require('../db/classes/Timer')
const TABLE = 'user_feed'

const handleNewFeed  = async (req, res) => {
  helper.createNewFeed(TABLE, {date:  await Timer.setDate(), time: await Timer.setTime(), content: ['Нет активности'], profile_id: null}, res)
}

const handleAllFeed = (req, res) => {
  helper.getAll(TABLE, res);
};

const handleOneFeed = (req, res) => {
  const id = req.params.id
  helper.getOne(TABLE, id, res)
}

const handleUpdateFeed = async (req, res) => {
  let {id, profile_id} = req.body
  const updated = await helper.updateFeed(TABLE, {date:  await Timer.setDate(), time: await Timer.setTime(), content: ['Нет активности'],profile_id}, id)
  res.json(updated)
}

module.exports = { handleNewFeed, handleAllFeed, handleOneFeed, handleUpdateFeed }