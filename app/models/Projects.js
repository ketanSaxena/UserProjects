import mongoose from 'mongoose';

var ProjectSchema = new mongoose.Schema({
  name: String,
  description: String
});

export default mongoose.model('Projects', ProjectSchema);