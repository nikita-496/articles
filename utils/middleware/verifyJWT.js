const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../logger');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.sendStatus(401);
  }
  logger.info(authHeader); // Bearer token
  const token = authHeader.split(' ')[1];
  jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // invalid token
    }
    req.login = decoded.login;
    next();
  });
};

module.exports = verifyJWT;
