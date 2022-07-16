const ExporerPerson = require('../../db/classes/ExplorerPerson');

const validateName = async (validationName, res, field) => {
  if (validationName.length > 50) {
    return res.status(400).json({
      error: field === "Имя" ? 'Имя должно быть не более 50 символов' : 'Фамилия должна быть не более 50 символов' 
    })
  }
  else if (!/^[A-Z]|[А-Я]/.test(validationName)) {
    return res.status(400).json({
      error: field === "Имя" ? 'Имя должно начинаться с заглавной буквы' : 'Фамилия должна начинаться с заглавной буквы' 
    })
  }
  else if (!/^[a-zA-Z]+$|^[а-яА-Я]+$/.test(validationName)) {
    return res.status(400).json({
      error: field === "Имя" ? 'Имя должно состоять из букв латинского алфавита или кириллицы' : 'Фамилия должна состоять из букв латинского алфавита или кириллицы'
    })
  }
  else if (checkRegistr(validationName)) {
    return res.status(400).json({
      error: 'Заглавная буква только первая'
    })
  }
};

const validateLogin = async (validationLogin, res) => {
  if (validationLogin.length > 50) {
    return res.status(400).json({
      error: 'Логин должен быть не более 50 символов'
    })
  }
  else if (!matchFirstChar(validationLogin)) {
    return res.status(400).json({
      error: 'Логин не должен начинаться с цифр'
    })
  }
  else if (/[!, @, #, $, %, :, ^, &, *, ?, /, =, +, -, (, ), ;, №]|\s/.test(validationLogin)) {
    return res.status(400).json({
      error: 'Логин не должен содержать пробелы, специальные символы: !, @, #, $, %, :, ^, &, *, ?, /, =, +, -, (, ), ;, №'
    })
  }

  // Проверить наличие на дублирования логина регистрируемго пользователя с существующими в бд
  const registeredLogin = await ExporerPerson.selectByLogin(validationLogin);
  if (registeredLogin.length) {
    return res.status(400).json({
      error: 'Логин занят'
    })
  }
};

const validatePassword = async (validationPassword, res) => {
  if (validationPassword.length < 8) {
    return res.status(400).json({
      error: 'Пароль долнжен быть не менее 8 символов'
    })
  }
  if (!/[a-zA-z]|[а-яА-Я]/.test(validationPassword)) {
    return res.status(400).json({
      error: 'Пароль должен содержать минимум 1 буквенный символ'
    })
  }
}

const validateEmail = async (validationEmail, res) => {
  const registeredEmail = await ExporerPerson.selectEmail(validationEmail);
  if (registeredEmail.length) {
    return res.status(400).json({
      error: 'Email занят'
    })
  }
  if (!validationEmail.includes('@')) {
    return res.status(400).json({
      error: 'Email неверного формата'
    })
  }
};

const matchFirstChar = (string) => {
  const firstChar = string.charAt(0);
  return isNaN(firstChar);
};

const checkRegistr = (string) => {
  for (let i = 0; i < string.length; i++) {
    if (i === 0) continue;
    if (string[i] === string[i].toUpperCase()) {
      return true;
    }
  }
  return false;
};

module.exports = {
  validateName,
  validateLogin,
  validatePassword,
  validateEmail,
};
