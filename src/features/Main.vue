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
      <div class="main__timer-clock" v-show="!warmupInitiated"></div>
      <div class="main__timer-control" v-show="!warmupInitiated">
        <div
          class="button-control button--start-timer"
          v-show="!timerRunning"
          @click="initWarmup"
        >
          START
        </div>
        <div
          class="button-control button--stop-timer"
          v-show="timerRunning"
          @click="stopTimer"
        >
          STOP
        </div>
      </div>
      <div class="main__timer-warmup" v-show="warmupInitiated"></div>
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
const storage = require("@/utils/appStorage.js");

export default {
  data() {
    return {
      darkThemeEnabled: null,
      warmupInitiated: null,
      timerRunning: false,
      cubeScramble: generateScramble(),
      timer: null,
      warmupDuration: 0
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
      this.warmupInitiated = false;
      this.timer.reset();
      this.timer.start();
      this.timerRunning = true;
    },

    stopTimer() {
      this.timer.stop();
      this.timerRunning = false;
    },

    initWarmup() {
      this.warmupInitiated = true;

      let timeRemaining = this.warmupDuration;
      let countdown = setInterval(() => {
        let timeStr =
          timeRemaining.toString() === "0" ? "" : timeRemaining.toString();
        document.querySelector(".main__timer-warmup").innerHTML = timeStr;
        timeRemaining -= 1;
        if (timeRemaining === -1) {
          clearInterval(countdown);
          this.startTimer();
        }
      }, 1000);
    },

    checkTheme() {
      let body = document.querySelector("body");
      this.darkThemeEnabled = body.classList.contains("dark-theme");
    },

    handleSpacebar(e) {
      if (e.keyCode === 32 && !this.warmupInitiated) {
        this.timerRunning ? this.stopTimer() : this.initWarmup();
      }
    }
  },

  mounted() {
    this.timer = new Stopwatch();
    this.$nextTick(this.checkTheme);

    let settings = storage.loadSettings();
    settings.sections["General"].options.find(option => {
      if (option.name === "warmupDuration") this.warmupDuration = option.value;
    });

    document.addEventListener("keyup", this.handleSpacebar);
  },

  updated() {
    this.checkTheme();
  },

  beforeDestroy() {
    document.removeEventListener("keyup", this.handleSpacebar);
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
    font-size: 3vh;
    padding: 0 2%;
    align-self: center;

    &-button {
      align-self: center;
      cursor: pointer;

      img {
        width: 6vh;
        height: 6vh;
      }
    }
  }

  &__timer {
    display: grid;
    grid-template-rows: 60% 40%;

    &-clock {
      grid-row: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      font-family: monospace;
      font-size: 18vh;
    }

    &-control {
      grid-row: 2;
      display: flex;
      justify-content: center;
      position: relative;
    }

    &-warmup {
      color: var(--orange);
      font-size: 24vh;
      align-self: center;
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
    width: 6vh;
    height: 6vh;
  }
}

.button--statistics {
}

.button-control {
  .scale(0.95);
  border-radius: 1vmax;
  cursor: pointer;

  width: 33%;
  height: 60%;
  font-size: 6vh;
  font-weight: bold;

  align-self: center;

  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
}

.button--start-timer {
  background: var(--green);
  color: darken(#98c379, 30%);
}

.button--stop-timer {
  background: var(--dark-red);
  color: pink;
}

.spacebar-hint {
  position: absolute;
}

.rotato {
  transition: all 0.5s ease-in-out;
  transform: rotate(360deg);
}
</style>
