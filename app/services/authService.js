import Users from '../models/Users';
import config from '../config';
import CONSTANTS from '../constants';
import jwt from 'jwt-simple';

var _generateToken = (user) => {
  var expires = new Date();
  expires.setHours(expires.getHours()
    + CONSTANTS.TOKEN_EXPIRY_HOURS);
  return jwt.encode({
    id: user._id,
    expires: expires
  }, config.jwtTokenSecret);
};

var UserService = {
	login: (req, res) => {
    var creds = req.body;
    var unauthorized = CONSTANTS.ERR_CODES.unauthorized;
    Users.findOne({ user_id: creds.id }, (err, user) => {
      if (err)
        return res.send(err);
      if(!user) {
        res.status(unauthorized)
          .send({success: false, message: CONSTANTS.RESPONSE_MESSAGES.userNotFound});
      } else if(bcrypt.compareSync(creds.password, user.password)) {
        res.json({ success: true , token: _generateToken(user)});
      } else {
        res.status(unauthorized)
          .send({success: false, message: CONSTANTS.RESPONSE_MESSAGES.wrongPassword });
      }
    });
  },
};

export default UserService;
