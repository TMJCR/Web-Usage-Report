const mongoose = require('mongoose');

const Summary = mongoose.model('Summary', {
  year: Number,
  monthName: String,
  monthIndex: Number,
  value: Number,
});

module.exports = Summary;
