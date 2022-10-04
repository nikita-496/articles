const postRouter = require('express').Router();
const postController = require('../controller/post');

const paginatedResults = require('../utils/middleware/paginatedResults');

postRouter
  .route('/')
  .get(paginatedResults(postController), (req, res) => {
    res.json(res.paginatedResults)
  })
  .post(postController.handleNewPost)
  .put(postController.handleUpdatedPost);

postRouter.route('/:id').get(postController.handleOnePost).delete(postController.handleDeletedPost);

module.exports = postRouter;
