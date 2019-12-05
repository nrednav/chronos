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
    <div class="main__timer" v-if="timer">
      <div class="main__timer-clock">00:00:000</div>
      <div class="main__timer-controls">
        <div
          class="button--start-timer"
          v-show="!timerRunning"
          @click="startTimer"
        >
          START
        </div>
        <div
          class="button--stop-timer"
          v-show="timerRunning"
          @click="stopTimer"
        >
          STOP
        </div>
      </div>
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
import generateScramble from "@/utils/cubeScrambler.js";
import Stopwatch from "@/utils/stopwatch.js";

export default {
  data() {
    return {
      darkThemeEnabled: false,
      timerRunning: false,
      cubeScramble: generateScramble(),
      timer: null
    };
  },

  methods: {
    goHome() {
      this.$router.push("/");
    },

    generateScramble() {
      let refreshImage = document.querySelector(".main__scramble-button img");
      refreshImage.classList.add("rotato");
      setTimeout(() => {
        refreshImage.classList.remove("rotato");
        this.cubeScramble = generateScramble();
      }, 500);
    },

    startTimer() {
      this.timer.start();
      this.timerRunning = true;
    },

    stopTimer() {
      this.timer.stop();
      this.timerRunning = false;
      this.timer.reset();
    }
  },

  mounted() {
    let body = document.querySelector("body");
    this.darkThemeEnabled = body.classList.contains("dark-theme");
    this.timer = new Stopwatch();
  }
};
</script>

<style lang="less">
@import "../assets/styles/colors.less";
@import "../assets/styles/global.less";

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
    display: grid;
    grid-template-rows: 70% 30%;

    &-clock {
      grid-row: 1;
      font-size: 24vh;
      display: flex;
    }

    &-controls {
      grid-row: 2;
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
  .scale(1.1);
  align-self: center;
  cursor: pointer;

  img {
    width: 5vw;
    height: 5vw;
  }
}

.button--statistics {
}

.rotato {
  transition: all 0.5s ease-in-out;
  transform: rotate(360deg);
}
</style>
