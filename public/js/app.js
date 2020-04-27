document.querySelectorAll('.downloadText').forEach((item) => {
  item.style.opacity = 1;
});

const monthList = document.getElementById('month-selection');
const febMonths = [30, 31];
const aprMonths = [31];

monthList.onchange = function () {
  const selectedMonth = document.querySelector('#month-selection')
    .selectedOptions[0].label;
  const daySelection = document.querySelector('#day-selection').options;
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
