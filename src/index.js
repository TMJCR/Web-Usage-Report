const path = require('path');
const express = require('express');
const hbs = require('hbs');

const utils = require('../src/utils');
require('../db/mongoose');
// require('./seed');

const User = require('../models/user');
const Visits = require('../models/visit');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use('/public/', express.static(publicDirectoryPath));

const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const { year, month, day } = req.query;
  let reportDate;
  const todaysDate = new Date(2020, 4, 31); //would be today in the real app
  if (!(year && month && day)) {
    reportDate = todaysDate;
  } else {
    reportDate = new Date(year, month, day);
  }

  if (reportDate > todaysDate) {
    reportDate = todaysDate;
  }

  reportStartDate = utils.generateReportStartDate(reportDate, 30);

  const visits = await Visits.find({
    time: { $gte: reportStartDate, $lte: reportDate },
  }).sort({ time: 1 });

  const downloads = visits.filter((visit) => visit.download).length;
  const subscribers = visits.filter((visit) => visit.subscriber).length;
  const nonSubscribers = visits.filter((visit) => !visit.subscriber).length;
  const mobile = visits.filter((visit) => visit.device === 'Mobile').length;
  const desktop = visits.filter((visit) => visit.device === 'Desktop').length;
  const link = Math.round(
    (visits.filter((visit) => visit.method === 'Link').length / visits.length) *
      100
  );
  const url = Math.round(
    (visits.filter((visit) => visit.method === 'Url').length / visits.length) *
      100
  );
  const social = Math.round(
    (visits.filter((visit) => visit.method === 'Social').length /
      visits.length) *
      100
  );
  const advert = Math.round(
    (visits.filter((visit) => visit.method === 'Advert').length /
      visits.length) *
      100
  );

  console.log(
    downloads,
    subscribers,
    nonSubscribers,
    mobile,
    desktop,
    link,
    url,
    social,
    advert
  );

  res.render('index', {
    data: visits,
    downloads,
  });
});

// app.get('/*', (req, res) => {
//   res.redirect('/');
// });

app.listen(port, () => {
  console.log(`App is up and running on ${port}`);
});
