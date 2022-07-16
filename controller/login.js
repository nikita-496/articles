const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ExplorerPerson = require('../db/classes/ExplorerPerson');

const handleLogin = async (req, res) => {
  const { login, password } = req.body;

  const person = await ExplorerPerson.selectByLogin(login);
  console.log(person);
  const passwordCorrect = !person.length
    ? false
    : await bcrypt.compare(password, person[0].password);

  if (!(person[0] && passwordCorrect)) {
    return res.status(401).json({
      error: 'Пользователя с такими данными не существует',
    });
  }

  const personForToken = {
    login: person[0].login,
    id: person[0].id,
  };

  const token = jwt.sign(personForToken, process.env.SECRET);

  res.status(200).send({ token, login: person[0].login, name: person[0].name });
};

module.exports = { handleLogin };
