const bcrypt = require('bcrypt');
const personHelper = require('../utils/helper/person_helper');

const handleNewPerson = async (req, res) => {
  const { name, surname, login, password, email } = req.body;

  if (!name || !login || !password || !email) {
    return res.status(400).json({
      message: 'Имя пользователя, логин, пароль и email являются обязательными',
    });
  }

  //const registeredUsers = new Person();
  //const registeredLogins = await registeredUsers.selectLogin();
  // аналог - checkLogin

  //registerHepler.checkLogin()

  /*if (countDuplicates(registeredLogins.rows, login)) {
    return res.sendStatus(409); //Conflict
  }*/

  try {
    // шифрование пароля
    const hashedPwd = await bcrypt.hash(password, 10);
    // создание и запись нового пользователя
    personHelper.createNewPerson({ name, surname, login, password: hashedPwd, email }, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*function countDuplicates(registeredLogins, newLogin) {
  const duplicate = registeredLogins.filter(
    (registeredLogin) => registeredLogin.login === newLogin
  );
  return duplicate.length;
}*/

module.exports = { handleNewPerson }