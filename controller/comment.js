const Timer = require('../db/classes/Timer');
const helper = require('../utils/helper/helper');

const TABLE = 'comment';

const handleNewComment = async (req, res) => {
  const { content, post_id, user_id } = req.body;
  helper.createNewComment(
    TABLE,
    {
      content,
      publication_date: await Timer.setDate(),
      publication_time: await Timer.setTime(),
      post_id,
      user_id,
    },
    res
  );
};

const handleAllComment = (req, res) => {
  helper.getAll(TABLE, res);
};

const handleOneComment = (req, res) => {
  const id = req.params.id;
  helper.getOne(TABLE, id, res);
};

const handleDeletedComment = (req, res) => {
  const id = req.params.id;
  helper.remove(TABLE, id, res);
};

const handleUpdatedComment = async (req, res) => {
  const { id, content, post_id, user_id } = req.body;
  helper.updateComment(
    TABLE,
    {
      content,
      publication_date: await Timer.setDate(),
      publication_time: await Timer.setTime(),
      post_id,
      user_id,
    },
    id,
    res
  );
};

module.exports = {
  handleNewComment,
  handleAllComment,
  handleOneComment,
  handleDeletedComment,
  handleUpdatedComment,
};
