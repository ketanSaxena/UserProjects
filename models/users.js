var mongoose = require('mongoose');

var Users = new mongoose.Schema({
  profile: { first_name: String, last_name: String },
  login_credentials: {user_id: String, password: String},
  isSuperAdmin: Boolean,
  Projects: { project_id: String, role_id: String },
});

module.exports = mongoose.model('Users', Users);
