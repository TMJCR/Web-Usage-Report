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

const dateForm = document.querySelector('#date-form');
dateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const day = document.querySelector('#day-selection').selectedOptions[0].value;
  const month = document.querySelector('#month-selection').selectedOptions[0]
    .value;
  const year = document.querySelector('#year-selection').selectedOptions[0]
    .value;
  fetch('http://localhost:3000/data/?month=4&day=31+&year=2020').then(
    (response) => {
      response.json().then((data) => {
        console.log(data);
      });
    }
  );
  console.log(day, month, year);
});
