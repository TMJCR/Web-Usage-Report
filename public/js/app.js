document.querySelectorAll('.downloadText').forEach((item) => {
  item.style.opacity = 1;
});

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const monthList = document.getElementById('month-selection');
const dayList = document.getElementById('day-selection');

const febMonths = [30, 31];
const aprMonths = [31];

monthList.onchange = function () {
  const selectedMonth = document.querySelector('#month-selection')
    .selectedOptions[0].label;
  const daySelection = document.querySelector('#day-selection').options;
  dayList.options.selectedIndex = 0;
  if (selectedMonth === 'Feb') {
    febMonths.forEach((month) => {
      daySelection[month - 1].disabled = true;
    });
  } else if (selectedMonth === 'Apr') {
    aprMonths.forEach((month) => {
      daySelection[month - 1].disabled = true;
    });
  } else {
    febMonths.forEach((month) => {
      daySelection[month - 1].disabled = false;
    });
  }
};

// const updateSelectedDateFields = () => {
//   const date = document
//     .querySelector('#displayDate-update')
//     .innerText.split(' ');
//   monthList.options.selectedIndex = monthNames.indexOf(date[0]);
//   dayList.options.selectedIndex = date[1] - 1;
// };

// updateSelectedDateFields();

const dateForm = document.querySelector('#date-form');
dateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const day = document.querySelector('#day-selection').selectedOptions[0].value;
  const month = document.querySelector('#month-selection').selectedOptions[0]
    .value;
  const year = document.querySelector('#year-selection').selectedOptions[0]
    .value;
  fetch(
    `http://localhost:3000/data/?month=${month}&day=${day}+&year=${year}`
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
      } else {
        updateReport(data);
      }
    });
  });
});

const updateDownloadText = (data) => {
  document.querySelectorAll('.downloadText').forEach((item) => {
    const classToRemove = item.classList.value.split(' ').pop();
    item.classList.remove(classToRemove);
    item.classList.add(data.data.downloadColor);
    item.innerHTML = data.data.downloads[item.id];
  });
};

const updateValues = (data) => {
  const updates = document.querySelectorAll('.update');
  for (update of updates) {
    const item = update.id.split('-')[0];
    update.innerText = data.data[item];
  }
};

const updateTop5List = (data, listClass, variableName) => {
  let resultIndex;
  if (listClass.split('-')[1] === 'page') {
    resultIndex = 0;
  } else {
    resultIndex = 1;
  }
  const item = document.querySelectorAll(listClass);
  item.forEach((item, index) => {
    item.innerHTML = data.data[variableName][index][resultIndex];
  });
};

const updateDisplayDate = (data) => {
  const date = document.querySelector('#displayDate-update');
  date.innerHTML = data.displayDate;
};

const updateChartDataAndCharts = (data) => {
  weeklyData = data.chartData.weeklyData;
  monthlyData = data.chartData.weeklyData;
  weeklyLabels = data.chartData.weeklyLabels;
  monthlyLabels = data.chartData.weeklyLabels;
  removeAndUpdateCharts();
};

const updateReport = (data) => {
  updateValues(data);
  updateDownloadText(data);
  updateTop5List(data, '.popular-page', 'top5Pages');
  updateTop5List(data, '.popular-value', 'top5Pages');
  updateTop5List(data, '.company-page', 'top5Companies');
  updateTop5List(data, '.company-value', 'top5Companies');
  updateDisplayDate(data);
  updateChartDataAndCharts(data);
  document.querySelectorAll('.shake').forEach((d) => {
    d.classList.add('shaker');
    setTimeout(() => {
      d.classList.remove('shaker');
    }, 200);
  });
};
