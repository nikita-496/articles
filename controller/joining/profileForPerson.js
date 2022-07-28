const helper = require('../../utils/helper/helper');


const handleNewJoining = (req, res) => {
  const {user_id} = req.body
  console.log(user_id)
  helper.joinToPerson({valueToJoing: user_id}, res);
};


module.exports = {
  handleNewJoining,
 
};
