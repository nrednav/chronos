<template>
  <div class="main">
    <div class="main__header">
      <div class="button--home"></div>
      <div class="main__scramble"></div>
      <div class="main__scramble-button"></div>
    </div>
    <div class="main__timer">
      <div class="main__timer-clock"></div>
      <div class="main__timer-control"></div>
      <div class="main__timer-warmup" v-if="timerStarted"></div>
    </div>
    <div class="main__stats">
      <div class="main__stats-avgOf5"></div>
      <div class="main__stats-best"></div>
      <div class="button--statistics"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timerStarted: false
    };
  }
};
</script>

<style lang="less">
@import "../assets/styles/colors.less";

.main {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: 20% 60% 20%;

  &__header {
    background: var(--light-red);
    display: grid;
    grid-template-columns: 16% 68% 16%;
  }

  &__scramble {
    border: 1px solid white;

    &-button {
      border: 1px solid white;
    }
  }

  &__timer {
    background: var(--green);
    display: grid;
    grid-template-rows: 70% 30%;

    &-clock {
      border: 1px solid white;
    }

    &-control {
      border: 1px solid white;
    }

    &-warmup {
    }
  }

  &__stats {
    background: var(--blue);
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    &-avgOf5 {
      border: 1px solid white;
    }

    &-best {
      border: 1px solid white;
    }
  }
}

.button--home {
  border: 1px solid white;
}

.button--statistics {
}
</style>
