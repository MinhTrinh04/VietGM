const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['food', 'restaurant', 'team']
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = { Gallery };
