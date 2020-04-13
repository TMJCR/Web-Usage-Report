const express = require('express');
require('../db/mongoose');
// require('./seed');

const User = require('../models/user');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Here');
});

app.listen(port, () => {
  console.log(`App is up and running on ${port}`);
});
