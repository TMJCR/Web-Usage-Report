const path = require('path');
const express = require('express');
const hbs = require('hbs');

const utils = require('../src/utils');
require('../db/mongoose');
// require('./seed');

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
  const { year, month, day } = req.query;
  let reportDate;
  const todaysDate = new Date(Date.UTC(2020, 4, 31, 23, 59)); //would be today in the real app
  if (!(year && month && day)) {
    reportDate = todaysDate;
  } else {
    reportDate = new Date(Date.UTC(year, month, day, 23, 59));
  }
  if (reportDate > todaysDate) {
    reportDate = todaysDate;
  }
  const displayDate = reportDate.toDateString().split(' ').slice(1).join(' ');
  const reportStartDate = utils.generateReportStartDate(reportDate, 30);
  const visits = await utils.getVisits(Visits, reportStartDate, reportDate);
  const reportData = utils.generateReportData(visits);

  const prev7DaysStartDate = utils.generateReportStartDate(reportDate, 7);
  const prev7DaysVisits = await utils.getVisits(
    Visits,
    prev7DaysStartDate,
    reportDate
  );

  const visitsByDay = utils.getWeeklyData(prev7DaysVisits);

  const prevYearStartDate = utils.generateReportStartDate(reportDate, 365);
  const prevMonthlyVisits = await utils.getVisits(
    Summaries,
    prevYearStartDate,
    reportDate
  );
  const prev6MonthVisits = prevMonthlyVisits.slice(-6);

  const weeklyLabels = Object.keys(visitsByDay);
  const weeklyData = Object.values(visitsByDay);
  // const monthlyLabels = [`Jan`, 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  // const monthlyData = [110, 114, 106, 99, 112, 103];
  const monthlyLabels = prev6MonthVisits.map((visit) => visit.monthName);
  const monthlyData = prev6MonthVisits.map((visit) => visit.value);

  const chartData = { weeklyLabels, weeklyData, monthlyLabels, monthlyData };

  res.render('index', {
    data: reportData,
    displayDate,
    chartData,
  });
});

app.listen(port, () => {
  console.log(`App is up and running on ${port}`);
});
