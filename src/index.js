const express = require('express');
require('../db/mongoose');

const User = require('../models/user');
const app = express();
const port = process.env.PORT || 3000;

const user = new User({ firstName: 'Thomas', visits: ['_123abc', '_234bcd'] });
user.save();

app.get('/', (req, res) => {
  res.send('Here');
});

app.listen(port, () => {
  console.log(`App is up and running on ${port}`);
});
