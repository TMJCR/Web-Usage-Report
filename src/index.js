const path = require('path');
const express = require('express');
const hbs = require('hbs');

const utils = require('../src/utils');
require('../db/mongoose');
require('./seed');

const User = require('../models/user');
const Visits = require('../models/visit');
const Summaries = require('../models/summary');
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
hbs.registerHelper('inc', (value, options) => {
  return parseInt(value) + 1;
});

//Setup static directory to serve
app.use('/public/', express.static(publicDirectoryPath));

const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const reportDate = new Date(Date.UTC(2020, 4, 31, 12, 00)); //would be today in the real app
  const reportData = await utils.getDataAndUpdateReport(reportDate);
  res.render('index', {
    data: reportData.reportData,
    displayDate: reportData.displayDate,
    chartData: reportData.chartData,
    days: reportData.days,
  });
});

app.get('/data/', async (req, res) => {
  const { year, month, day } = req.query;
  let reportDate;
  const todaysDate = new Date(Date.UTC(2020, 4, 31, 12, 00)); //would be today in the real app
  if (!(year && month && day)) {
    reportDate = todaysDate;
  } else {
    try {
      reportDate = new Date(Date.UTC(year, month, day, 12));
    } catch (error) {
      reportDate = todaysDate;
    }
  }
  if (reportDate > todaysDate) {
    reportDate = todaysDate;
  }

  const reportData = await utils.getDataAndUpdateReport(reportDate);

  res.send({
    data: reportData.reportData,
    displayDate: reportData.displayDate,
    chartData: reportData.chartData,
  });
});

app.listen(port, () => {
  console.log(`App is up and running on ${port}`);
});
