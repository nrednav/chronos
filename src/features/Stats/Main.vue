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

export default Vue.extend({
  data() {
    return {
      stats: [
        { title: "Daily", value: 0 },
        { title: "Weekly", value: 1 },
        { title: "Monthly", value: 2 },
        { title: "Avg of Past 5", value: 3 },
        { title: "Best Time", value: 4 }
      ]
    };
  }
});
</script>

<style lang="less">
.stats--main {
  background: green;
  height: 54vh;
  padding: 5%;

  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  &-item {
    width: 33%;
    border: 1px solid white;

    display: grid;
    grid-template-rows: repeat(2, 1fr);
    align-items: center;

    &-title {
      background: black;
      color: white;
    }

    &-value {
      background: white;
      color: black;
    }
  }
}
</style>
