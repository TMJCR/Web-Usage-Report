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

  const downloads = filterAndCount(visits, 'download', true);
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
  console.log(top5Pages);
  return {
    totalVisits,
    uniqueVisits,
    averageVisitLength,
    downloads,
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
};
