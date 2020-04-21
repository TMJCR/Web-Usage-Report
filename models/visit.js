const mongoose = require('mongoose');

const Visit = mongoose.model('Visit', {
  page: {
    type: String,
  },
  userId: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  download: {
    type: Boolean,
  },
  subscriber: {
    type: Boolean,
  },
  device: {
    type: String,
  },
  method: {
    type: String,
  },
  visitLength: {
    type: Number,
  },
});

module.exports = Visit;
