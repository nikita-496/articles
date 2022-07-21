const bcrypt = require('bcrypt');
const helper = require('../utils/helper/helper');
const validationHelper = require('../utils/helper/validation_helper');

const handleNewPerson = async (req, res) => {
  const { name, surname, login, password, email } = req.body;

  if (!name || !login || !password || !email) {
    return res.status(400).json({
      message: 'Имя пользователя, логин, пароль и email являются обязательными',
    });
  }

  if (await validationHelper.validateName(name, res, 'Имя')) {
    return;
  } else if (await validationHelper.validateName(surname, res, 'Фамилия')) {
    return;
  } else if (await validationHelper.validateLogin(login, res)) {
    return;
  } else if (await validationHelper.validatePassword(password, res)) {
    return;
  } else if (await validationHelper.validateEmail(email, res)) {
    return;
  }

  try {
    // шифрование пароля
    const hashedPwd = await bcrypt.hash(password, 10);
    // создание и запись нового пользователя
    helper.createNewPerson(
      'person',
      { name, surname, login, password: hashedPwd, email, refresh_token: null }, res
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewPerson };
