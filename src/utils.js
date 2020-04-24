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

function generateReportStartDate(reportDate, lengthOfReportInDays) {
  const secondsInADay = 86400;
  let reportStartDate = new Date();
  reportStartDate.setTime(
    reportDate.getTime() - lengthOfReportInDays * secondsInADay * 1000
  );
  return reportStartDate;
}

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
  console.log(
    'totalVisits',
    totalVisits,
    'uniqeVisits',
    uniqueVisits,
    'averageVisitLength',
    averageVisitLength,
    'downloads',
    downloads,
    'subscribers',
    subscribers,
    'nonSubscribers',
    nonSubscribers,
    'mobile',
    mobile,
    'desktop',
    desktop,
    'link',
    link,
    'url',
    url,
    'social',
    social,
    'advert',
    advert
  );
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
    // top5Pages,
    // top5Companies,
  };
};

module.exports = {
  generateReportStartDate,
  getVisits,
  generateReportData,
};
