Chart.defaults.global.elements.point.borderWidth = 0.1;
Chart.defaults.global.elements.point.backgroundColor = 'rgba(14,110,183, 0.4)';
Chart.defaults.global.defaultFontColor = '#555';
Chart.defaults.global.defaultFontFamily = 'Roboto';

const setCanvasWidthandFontSize = (canvasName) => {
  const screenWidth = window.innerWidth;
  const canvas = document.getElementById(canvasName);
  if (screenWidth < 750) {
    canvas.width = 350;
    canvas.height = 275;
    return 14;
  } else if (screenWidth < 1050) {
    canvas.width = 300;
    canvas.height = 250;
    return 12;
  }
  return 11;
};

const updateWeeklyChart = (labels, data) => {
  const ctx = document.getElementById('weeklyChart').getContext('2d');
  const calculatedFontSize = setCanvasWidthandFontSize('weeklyChart');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Total Daily Visits',
          data,
          backgroundColor: ['rgba(14,110,183, 0.4)'],
          borderColor: ['rgba(14,110,183, 1)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Visits in Past Week',
        fontFamily: 'Roboto',
        fontStyle: 'bold',
      },
      responsive: false,

      tooltips: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        titleFontSize: 12,
        titleFontColor: 'rgba(74, 114, 167, 1)',
        bodyFontColor: '#000',
        bodyFontSize: 12,
        bodySpacing: 9,
        displayColors: false,
        borderColor: 'rgba(74, 114, 167, 0.5)',
        borderWidth: '1',
      },
      legend: {
        display: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
              color: '#000',
              tickMarkLength: 2,
            },
            ticks: {
              fontColor: '#000',
              fontSize: calculatedFontSize,
              padding: 5,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
              color: '#333',
              tickMarkLength: 0,
            },
            ticks: {
              fontColor: '#000',
              fontSize: calculatedFontSize,
              maxTicksLimit: 6,
              padding: 5,
            },
          },
        ],
        x: {
          display: true,
        },
        y: {
          display: true,
        },
      },
    },
  });
};

const updateMonthlyChart = (labels, data) => {
  const ctx = document.getElementById('monthlyChart').getContext('2d');
  const calculatedFontSize = setCanvasWidthandFontSize('monthlyChart');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Total Visits',
          data,
          backgroundColor: [
            'rgba(0, 70, 145, 1)',
            'rgba(216, 43, 128, 1)',
            'rgba(203, 18, 62, 1)',
            'rgba(242, 141, 48, 1)',
            'rgba(3, 157, 74, 1)',
            'rgba(253, 217, 0, 1)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 0)',
            'rgba(54, 162, 235, 0)',
            'rgba(255, 206, 86, 0)',
            'rgba(75, 192, 192, 0)',
            'rgba(153, 102, 255, 0)',
            'rgba(255, 159, 64, 0)',
          ],
          borderWidth: 1,
          barThickness: calculatedFontSize * 2,
          minBarLength: 22,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Visits in Past 6 Months',
        fontFamily: 'Roboto',
        fontStyle: 'bold',
      },
      responsive: false,
      tooltips: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        titleFontSize: 14,
        titleFontColor: 'rgba(110, 31, 119, 1)',
        bodyFontColor: '#000',
        bodyFontSize: 12,
        bodySpacing: 9,
        displayColors: false,
        borderColor: 'rgba(110, 31, 119, 0.5)',
        borderWidth: '1',
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
              color: '#000',
              tickMarkLength: 0,
            },
            ticks: {
              fontColor: '#000',
              fontSize: calculatedFontSize,
              padding: 5,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
              color: '#333',
              tickMarkLength: 0,
            },
            ticks: {
              fontColor: '#000',
              fontSize: calculatedFontSize,
              padding: 5,
              maxTicksLimit: 6,
            },
          },
        ],
      },
    },
  });
};
