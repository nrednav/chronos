const statsHelper = require("@/utils/statsHelper.ts").default;

const rootDoc = getComputedStyle(document.documentElement);

function getChart(theme: string): any {
  return {
    data: {
      labels: statsHelper.getChartData().labels,
      datasets: [
        {
          data: statsHelper.getChartData().data,
          pointBackgroundColor: rootDoc.getPropertyValue(
            `--chart-pointColor-${theme}`
          ),
          borderColor: rootDoc.getPropertyValue(`--chart-lineColor-${theme}`),
          borderWidth: 2,
          lineTension: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      scales: {
        xAxes: [
          {
            type: "time",
            time: { unit: "day" },
            ticks: {
              fontColor: rootDoc.getPropertyValue(`--chart-tickColor-${theme}`),
              fontSize: 18,
              maxRotation: 45,
              minRotation: 45,
              padding: 12
            },
            gridLines: {
              color: rootDoc.getPropertyValue(`--chart-gridLines-${theme}`)
            },
            scaleLabel: {
              display: true,
              labelString: "Days",
              fontSize: 24,
              fontColor: rootDoc.getPropertyValue(`--axes-labelColor-${theme}`)
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              fontColor: rootDoc.getPropertyValue(`--chart-tickColor-${theme}`),
              fontSize: 18,
              padding: 6
            },
            gridLines: {
              color: rootDoc.getPropertyValue(`--chart-gridLines-${theme}`)
            },
            scaleLabel: {
              display: true,
              labelString: "Solve Time (seconds)",
              fontSize: 24,
              fontColor: rootDoc.getPropertyValue(`--axes-labelColor-${theme}`)
            }
          }
        ]
      }
    }
  };
}

export default {
  getChart
};
