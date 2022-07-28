const helper = require('../../utils/helper/helper');

const handleNewJoining = (req, res) => {
  const {profile_id} = req.body
  console.log(profile_id)
  helper.joinToProfile({valueToJoing: profile_id}, res);
};


module.exports = {
  handleNewJoining,
 
};
