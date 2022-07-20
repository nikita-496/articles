const ExplorerPerson = require('../db/classes/ExplorerPerson');
const helper = require('../utils/helper/helper');


const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); //No content
  }

  const refreshToken = cookies.jwt;

  const foundPerson = await ExplorerPerson.selectByRefreshToken(refreshToken);

  // Is refreshToken in db?
  if (!foundPerson) {
    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(204);
  }
  
  // Delete refres token in db
  const { name, surname, login, password, email, id} = foundPerson;
  await helper.updatePerson('person', {name, surname, login, password, email, refresh_token: null}, id)
  res.clearCookie('jwt', { httpOnly: true });
  res.sendStatus(204)
};

module.exports = { handleLogout };
