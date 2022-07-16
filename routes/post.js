const postRouter = require('express').Router();
const postController = require('../controller/post');

postRouter
  .route('/')
  .get(postController.handleAllPosts)
  .post(postController.handleNewPost)
  .put(postController.handleUpdatedPost)

postRouter
  .route('/:id')
  .get(postController.handleOnePost)
  .delete(postController.handleDeletedPost)

module.exports = postRouter;
