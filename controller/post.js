const helper = require('../utils/helper/helper');
const TABLE = 'post';

const handleNewPost = (req, res) => {
  const { title, content, tags } = req.body;
  helper.createNewPost(TABLE, { title, content, tags }, res);
};

const handleAllPosts = () => helper.getAll(TABLE);

const handleOnePost = (req, res) => {
  const id = req.params.id;
  helper.getOne(TABLE, id, res);
};

const handleDeletedPost = (req, res) => {
  const id = req.params.id;
  helper.remove(TABLE, id, res);
};

const handleUpdatedPost = (req, res) => {
  const { id, title, content, tags } = req.body;
  helper.updatePost(TABLE, {title, content, tags }, id, res);
};

module.exports = {
  handleNewPost,
  handleAllPosts,
  handleOnePost,
  handleDeletedPost,
  handleUpdatedPost,
};
