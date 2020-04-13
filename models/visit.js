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
});

module.exports = Visit;
