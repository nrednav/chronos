<template>
  <div class="stats--main">
    <div class="stats--main-item" v-for="(stat, index) in stats" :key="index">
      <div class="stats--main-item-title">{{ stat.title }}</div>
      <div class="stats--main-item-value">{{ stat.value }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import statsHelper from "@/utils/statsHelper.ts";

export default Vue.extend({
  data(): {
    stats: Array<any>;
  } {
    return {
      stats: new Array<any>()
    };
  },

  mounted() {
    this.stats = [
      { title: "Daily", value: statsHelper.getAvg("daily") },
      { title: "Weekly", value: statsHelper.getAvg("weekly") },
      { title: "Monthly", value: statsHelper.getAvg("monthly") },
      { title: "Avg of Past 5", value: statsHelper.getAvg("past5") },
      { title: "Best Time", value: statsHelper.getBestTime() }
    ];
  }
});
</script>

<style lang="less">
.stats--main {
  height: 54vh;
  padding: 2.5% 5%;

  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  * {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &-item {
    width: 30%;
    font-size: 4vh;

    &:nth-child(4),
    &:nth-child(5) {
      :first-child {
        color: var(--green);
      }
    }

    &-title {
      color: var(--blue);
      &:after {
        content: "";
        display: block;
        margin: 0 auto;
        width: 75%;
        padding-top: 2vh;
        border-bottom: 1px solid var(--text-color);
      }
    }

    &-value {
      padding-top: 2vh;
    }
  }
}
</style>
