import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
  user_id: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  profile: {
  	first_name: String,
  	last_name: String,
  },
  is_super_admin: Boolean,
  projects: { project_id: String, role_id: String },
});

export default mongoose.model('Users', UserSchema);