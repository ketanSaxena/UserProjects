import mongoose from 'mongoose';

export default mongoose.model('Roles', new mongoose.Schema({
  title: String,
  description: String
}));