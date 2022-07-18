const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const logger = require('../utils/logger');

const ExplorerPerson = require('../db/classes/ExplorerPerson');


const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }
  logger.info(`cookies - ${cookies.jwt}`);
  const refreshToken = cookies.jwt;

  const findPerson = await ExplorerPerson.selectByRefreshToken(refreshToken);

  if (!findPerson) {
    return res.sendStatus(403); //Forbidden
  }
  
  jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || findPerson.login !== decoded.login) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign({ login: decoded.login }, config.ACCESS_TOKEN_SECRET, {
      expiresIn: '30s',
    });
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
