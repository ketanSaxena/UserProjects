import mongoose from 'mongoose';

export default mongoose.model('Role', new mongoose.Schema({
  title: String,
  description: String
}));