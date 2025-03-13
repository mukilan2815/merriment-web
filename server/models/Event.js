
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0
  },
  organizer: {
    type: String,
    required: true
  },
  speakers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Speaker'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
