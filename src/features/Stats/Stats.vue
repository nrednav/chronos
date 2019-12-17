<template>
  <div id="stats">
    <Header />
    <Main />
    <Chart
      v-if="chartData && chartOptions"
      :chartdata="chartData"
      :options="chartOptions"
      id="leChart"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Header from "@/features/Stats/Header.vue";
import Main from "@/features/Stats/Main.vue";
import Chart from "@/features/Stats/Chart.vue";

const chartHelper = require("@/utils/chartHelper.ts").default;

export default Vue.extend({
  components: {
    Header,
    Main,
    Chart
  },
  data() {
    return {
      chartData: null,
      chartOptions: null
    };
  },

  mounted() {
    let theme = document.querySelector("body").classList.contains("dark-theme")
      ? "dark"
      : "light";
    const chart = chartHelper.getChart(theme);
    this.chartData = chart.data;
    this.chartOptions = chart.options;
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
