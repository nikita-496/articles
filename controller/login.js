const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../utils/config');
const ExplorerPerson = require('../db/classes/ExplorerPerson');
const helper = require('../utils/helper/helper');

const handleLogin = async (req, res) => {
  let { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ message: 'Логин и пароль обязательны' });
  }

  const findPerson = await ExplorerPerson.selectByLogin(login);
  const passwordCorrect = !findPerson ? false : await bcrypt.compare(password, findPerson.password);
  
  if (!(findPerson && passwordCorrect)) {
    //Unauthorized
    return res.status(401).json({
      error: 'Пользователя с такими данными не существует',
    });
  }

  const accessToken = createAccessToken(findPerson);
  const refreshToken = createRefreshToken(findPerson);

  const { name, surname, email, id} = findPerson;  
  password = await bcrypt.hash(password, 10);
  await helper.updatePerson('person', {name, surname, login, password, email, refresh_token: refreshToken}, id,res)

  res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.json({ accessToken })
};

const createAccessToken = (person) => {
  const accessToken = jwt.sign({ login: person.login }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: '30s',
  });
  return accessToken;
};

const createRefreshToken = (person) => {
  const refreshToken = jwt.sign({ login: person.login }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  });
  return refreshToken;
};
module.exports = { handleLogin };
