<template>
  <div class="main">
    <div class="main__header">
      <div class="button--home" @click="goHome">
        <img src="@/assets/icons/home-dark.svg" v-show="!darkThemeEnabled" />
        <img src="@/assets/icons/home.svg" v-show="darkThemeEnabled" />
      </div>
      <div class="main__scramble">
        {{ cubeScramble }}
      </div>
      <div class="main__scramble-button" @click="generateScramble">
        <img src="@/assets/icons/refresh.svg" />
      </div>
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
import generate from "@/utils/cubeScrambler.js";

export default {
  data() {
    return {
      darkThemeEnabled: false,
      timerStarted: false,
      cubeScramble: generate()
    };
  },

  methods: {
    goHome() {
      this.$router.push("/");
    },

    generateScramble() {
      this.cubeScramble = generate();
    }
  },

  mounted() {
    let body = document.querySelector("body");
    this.darkThemeEnabled = body.classList.contains("dark-theme");
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
    display: grid;
    grid-template-columns: 16% 68% 16%;
  }

  &__scramble {
    padding: 0 2%;
    align-self: center;

    &-button {
      align-self: center;
      cursor: pointer;

      img {
        width: 5vw;
        height: 5vw;
      }
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
  align-self: center;
  cursor: pointer;

  img {
    width: 5vw;
    height: 5vw;
  }
}

.button--statistics {
}
</style>
