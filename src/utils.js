function generateReportStartDate(reportDate, lengthOfReportInDays) {
  const secondsInADay = 86400;
  let reportStartDate = new Date();
  reportStartDate.setTime(
    reportDate.getTime() - lengthOfReportInDays * secondsInADay * 1000
  );
  return reportStartDate;
}

module.exports = {
  generateReportStartDate,
};
