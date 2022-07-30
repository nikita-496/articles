const commentRouter = require('express').Router();
const commentController = require('../controller/comment');

commentRouter
  .route('/')
  .get(commentController.handleAllComment)
  .post(commentController.handleNewComment)
  .put(commentController.handleUpdatedComment);

commentRouter
  .route('/:id')
  .get(commentController.handleOneComment)
  .delete(commentController.handleDeletedComment);

module.exports = commentRouter;
