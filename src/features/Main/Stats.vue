<template>
  <div class="main__stats" v-show="!warmupInitiated">
    <div class="main__stats-avgOf5">
      <div class="stats--title">Avg. of Past 5</div>
      <div class="stats--value">5m 40s</div>
    </div>
    <div class="main__stats-best">
      <div class="stats--title">Best Time</div>
      <div class="stats--value">4m 20s</div>
    </div>
    <div class="button--statistics" @click="$emit('goStats')">
      STATS
    </div>
  </div>
</template>

<script>
export default {
  props: ["warmupInitiated", "stats"]
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
