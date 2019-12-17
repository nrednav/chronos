<template>
  <div id="stats">
    <Header />
    <Main />
    <div class="stats--chart-title">PROGRESS</div>
    <Chart
      v-if="chartData && chartOptions"
      :chartdata="chartData"
      :options="chartOptions"
      class="stats--chart-main"
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
      chartOptions: null,
      darkThemeEnabled: true
    };
  },

  methods: {
    checkTheme() {
      let body = document.querySelector("body");
      this.darkThemeEnabled = body.classList.contains("dark-theme");
    },
    setupChart() {
      let theme = this.darkThemeEnabled ? "dark" : "light";
      const chart = chartHelper.getChart(theme);
      this.chartData = chart.data;
      this.chartOptions = chart.options;
    }
  },

  mounted() {
    setTimeout(() => {
      this.checkTheme();
      this.setupChart();
    }, 0);
  }
});
</script>

<style lang="less">
@import "../../assets/styles/colors.less";
@import "../../assets/styles/global.less";

#stats {
  width: 100%;
}

.stats--chart {
  &-title {
    font-size: 6vh;
    font-weight: bold;
    letter-spacing: 2px;
    align-self: center;

    .line-divider(~"90%");
  }

  &-main {
    padding-top: 2vh;
    grid-row: 2;
    width: 90%;
    margin: 0 auto 12vh auto;
  }
}

body::-webkit-scrollbar {
  display: none;
}
</style>
