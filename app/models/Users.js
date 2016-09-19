import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
  profile: {
  	first_name: String,
  	last_name: String,
  },
  login_credentials: {
  	user_id: String,
  	password: String
  },
  isSuperAdmin: Boolean,
  Projects: { project_id: String, role_id: String },
});

export default mongoose.model('Users', UserSchema);