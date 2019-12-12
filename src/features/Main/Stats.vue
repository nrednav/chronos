<template>
  <div class="main__stats" v-show="!warmupInitiated">
    <div class="main__stats-avgOf5">
      <div class="stats--title">Avg. of Past 5</div>
      <div class="stats--value">{{ avgOf5 }}</div>
    </div>
    <div class="main__stats-best">
      <div class="stats--title">Best Time</div>
      <div class="stats--value">{{ stats.best_time }}</div>
    </div>
    <div class="button--statistics" @click="$emit('goStats')">
      STATS
    </div>
  </div>
</template>

<script>
function computeAverage(arr) {
  return arr.reduce((a, b) => a + b, 0) / 5;
}

function formatTime(value) {
  let seconds = parseInt(value / 1000).toString();
  let minutes = parseInt(value / 60000).toString();
  let milliseconds = parseInt(
    value - minutes * 60000 - seconds * 1000
  ).toString();

  if (minutes.length < 2) minutes = "0" + minutes;
  if (seconds.length < 2) seconds = "0" + seconds;
  if (milliseconds.length < 3) milliseconds = "0" + milliseconds;

  return `${minutes}:${seconds}.${milliseconds.substr(0, 2)}`;
}

export default {
  props: ["warmupInitiated", "stats"],

  data() {
    return {
      avgOf5: "N/A"
    };
  },

  methods: {
    computeAvgOf5() {
      let historyLength = this.stats.history.length;
      if (historyLength < 5) {
        return "N/A";
      }
      let past5 = this.stats.history.slice(historyLength - 5, historyLength);
      let solveTimes = past5.map(obj => obj.solve_time_value);

      let average = computeAverage(solveTimes);
      this.avgOf5 = formatTime(average);
    }
  },

  mounted() {
    this.computeAvgOf5();
  }
};
</script>

<style lang="less">
.main {
  &__stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    * {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .stats--title {
      font-size: 3vh;
      font-weight: bold;
      color: var(--stats-title);

      &:after {
        content: "";
        display: block;
        margin: 0 auto;
        width: 50%;
        padding-top: 2vh;
        border-bottom: 1px solid var(--text-color);
      }
    }

    .stats--value {
      padding-top: 2vh;
      font-size: 4vh;
      color: var(--stats-value);
    }
  }
}
</style>
