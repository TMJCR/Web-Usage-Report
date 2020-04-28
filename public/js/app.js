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

const updateSelectedDateFields = () => {
  const date = document.querySelector('#date').innerText.split(' ');
  monthList.options.selectedIndex = monthNames.indexOf(date[0]);
  dayList.options.selectedIndex = date[1] - 1;
};

updateSelectedDateFields();
