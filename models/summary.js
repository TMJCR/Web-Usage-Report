const mongoose = require('mongoose');

const Summary = mongoose.model('Summary', {
  time: Date,
  year: Number,
  monthName: String,
  monthIndex: Number,
  value: Number,
});

module.exports = Summary;
