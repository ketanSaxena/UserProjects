import mongoose from 'mongoose';

export default mongoose.model('Projects', new mongoose.Schema({
  name: String,
  description: String
}));