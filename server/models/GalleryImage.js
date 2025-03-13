
const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);

module.exports = GalleryImage;
