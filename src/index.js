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

  const reportStartDate = utils.generateReportStartDate(reportDate, 30);
  const visits = await utils.getVisits(Visits, reportStartDate, reportDate);
  const reportData = utils.generateReportData(visits);

  const getCountFromDatabase = (collection, key) => {
    const sum = collection.reduce((sum, current) => {
      if (typeof sum[current[key]] === 'undefined') {
        sum[current[`${key}`]] = 1;
      } else {
        sum[current[`${key}`]] += 1;
      }
      return sum;
    }, {});
    return sum;
  };

  const rankVariable = (collection) => {
    return Object.keys(collection)
      .map((key) => {
        return [key, collection[key]];
      })
      .sort((a, b) => b[1] - a[1]);
  };

  const pageCounts = getCountFromDatabase(visits, 'page');
  const rankedPages = rankVariable(pageCounts);
  const top5Pages = rankedPages.slice(0, 5);

  const companyCounts = getCountFromDatabase(visits, 'company');
  const rankedCompanies = rankVariable(companyCounts);
  const top5Companies = rankedCompanies.slice(0, 5);

  res.render('index', { data: reportData });
});

// app.get('/*', (req, res) => {
//   res.redirect('/');
// });

app.listen(port, () => {
  console.log(`App is up and running on ${port}`);
});
