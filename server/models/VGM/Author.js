import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  avatar: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Author = mongoose.model('Author', authorSchema);

module.exports = { Author };

module.exports = { Author };