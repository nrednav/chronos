<template>
  <div id="stats">
    <Header />
    <Main />
    <Chart :chartdata="chartData" :options="chartOptions" id="leChart" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Header from "@/features/Stats/Header.vue";
import Main from "@/features/Stats/Main.vue";
import Chart from "@/features/Stats/Chart.vue";

import statsHelper from "@/utils/statsHelper.ts";

const rootDoc = getComputedStyle(document.documentElement);

export default Vue.extend({
  components: {
    Header,
    Main,
    Chart
  },
  data() {
    return {
      chartData: {
        labels: statsHelper.getChartData().labels,
        datasets: [
          {
            data: statsHelper.getChartData().data,
            pointBackgroundColor: rootDoc.getPropertyValue("--text-color"),
            borderColor: rootDoc.getPropertyValue("--orange"),
            borderWidth: 2,
            lineTension: 0
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "day"
              },
              ticks: {
                fontColor: rootDoc.getPropertyValue("--chart-tickColor")
              },
              gridLines: {
                color: rootDoc.getPropertyValue("--chart-gridlines")
              },
              scaleLabel: {
                display: true,
                labelString: "Days",
                fontSize: 24,
                fontColor: rootDoc.getPropertyValue("--white")
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontColor: rootDoc.getPropertyValue("--chart-tickColor")
              },
              gridLines: {
                color: rootDoc.getPropertyValue("--chart-gridlines")
              },
              scaleLabel: {
                display: true,
                labelString: "Solve Time",
                fontSize: 24,
                fontColor: rootDoc.getPropertyValue("--white")
              }
            }
          ]
        }
      }
    };
  },

  mounted() {
    let chartData = statsHelper.getChartData();

    console.log(chartData);
    this.chartData.labels = chartData.labels;
    this.chartData.datasets[0].data = chartData.data;
  }
});
</script>

<style lang="less">
@import "../../assets/styles/colors.less";

#stats {
  width: 100%;
}

#leChart {
  width: 90%;
  margin: 0 auto 12vh auto;
}

body::-webkit-scrollbar {
  display: none;
}
</style>
