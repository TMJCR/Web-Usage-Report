const filterAndCount = (
  collectionToFilter,
  variable,
  value,
  returnAspercent = false
) => {
  if (!returnAspercent) {
    return collectionToFilter.filter((record) => record[variable] === value)
      .length;
  }
  return Math.round(
    (collectionToFilter.filter((record) => record[variable] === value).length /
      collectionToFilter.length) *
      100
  );
};

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

const getWeeklyData = (collection) => {
  const visitsByDay = collection.reduce((sum, current) => {
    const date = `${current.time.getDate()}/${current.time.getMonth() + 1}`;
    if (typeof sum[date] === 'undefined') {
      sum[date] = 1;
    } else {
      sum[date] += 1;
    }
    return sum;
  }, {});
  return visitsByDay;
};

const getDownloadColor = (numOfDownloads) => {
  if (numOfDownloads <= 10) {
    return 'st11';
  } else if (numOfDownloads <= 20) {
    return 'st9';
  } else if (numOfDownloads <= 50) {
    return 'st7';
  } else if (numOfDownloads <= 100) {
    return 'st8';
  } else {
    return 'st10';
  }
};
const rankVariable = (collection) => {
  return Object.keys(collection)
    .map((key) => {
      return [key, collection[key]];
    })
    .sort((a, b) => b[1] - a[1]);
};

const generateReportStartDate = (reportDate, lengthOfReportInDays) => {
  const secondsInADay = 86400;
  let reportStartDate = new Date();
  reportStartDate.setTime(
    reportDate.getTime() - lengthOfReportInDays * secondsInADay * 1000
  );

  return reportStartDate;
};

const getVisits = async (model, reportStartDate, reportDate) => {
  return await model
    .find({
      time: { $gte: reportStartDate, $lte: reportDate },
    })
    .sort({ time: 1 });
};

const generateReportData = (visits) => {
  const totalVisits = visits.length;
  const visitors = visits.map((visit) => visit.userId);
  const uniqueVisits = [...new Set(visitors)].length;
  const averageVisitLength = Math.round(
    visits.reduce((sum, visit) => sum + visit.visitLength, 0) / visits.length
  );

  const numOfDownloads = filterAndCount(visits, 'download', true);
  const downloads = { singleDigit: '', doubleDigit: '', tripleDigit: '' };
  if (numOfDownloads.toString().length === 1) {
    downloads.singleDigit = numOfDownloads;
  } else if (numOfDownloads.toString().length === 2) {
    downloads.doubleDigit = numOfDownloads;
  } else {
    downloads.tripleDigit = numOfDownloads;
  }
  const downloadColor = getDownloadColor(numOfDownloads);
  const subscribers = filterAndCount(visits, 'subscriber', true);
  const nonSubscribers = filterAndCount(visits, 'subscriber', false);
  const mobile = filterAndCount(visits, 'device', 'Mobile', true);
  const desktop = filterAndCount(visits, 'device', 'Desktop', true);
  const link = filterAndCount(visits, 'method', 'Link', true);
  const url = filterAndCount(visits, 'method', 'Url', true);
  const social = filterAndCount(visits, 'method', 'Social', true);
  const advert = filterAndCount(visits, 'method', 'Advert', true);

  const pageCounts = getCountFromDatabase(visits, 'page');
  const rankedPages = rankVariable(pageCounts);
  const top5Pages = rankedPages.slice(0, 5);

  const companyCounts = getCountFromDatabase(visits, 'company');
  const rankedCompanies = rankVariable(companyCounts);
  const top5Companies = rankedCompanies.slice(0, 5);

  return {
    totalVisits,
    uniqueVisits,
    averageVisitLength,
    downloads,
    downloadColor,
    subscribers,
    nonSubscribers,
    mobile,
    desktop,
    link,
    url,
    social,
    advert,
    top5Pages,
    top5Companies,
  };
};

module.exports = {
  generateReportStartDate,
  getVisits,
  generateReportData,
  getWeeklyData,
};
