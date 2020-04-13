const mongoose = require('mongoose');

const User = mongoose.model('User', {
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  company: {
    type: String,
  },
  email: {
    type: String,
  },
  visits: {
    type: Array,
  },
});

module.exports = User;
