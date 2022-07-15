const logger = require('../logger');

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'Conflict') {
    return res.status(409);
  }
  next(error)
};

module.exports = { errorHandler };
