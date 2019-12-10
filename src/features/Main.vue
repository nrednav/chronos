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
      <div class="main__timer-clock" v-show="!warmupInitiated">00:00:00</div>
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
    <div class="main__stats" v-show="!warmupInitiated">
      <div class="main__stats-avgOf5">
        <div class="stats--title">Avg. of Past 5</div>
        <div class="stats--value">5m 40s</div>
      </div>
      <div class="main__stats-best">
        <div class="stats--title">Best Time</div>
        <div class="stats--value">4m 20s</div>
      </div>
      <div class="button--statistics" @click="goStats">
        STATISTICS
      </div>
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

    goStats() {
      if (this.timerRunning) this.stopTimer();
      this.$router.push("/stats");
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

		let settings = storage.load("config/app-settings.json");
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
  grid-template-rows: 20% 50% 30%;

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
      color: var(--warmup-text-color);
      font-size: 36vh;
      align-self: center;
      grid-row: ~"1/3";
    }
  }

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

.button--home {
  .scale(1.1);
  align-self: center;
  cursor: pointer;

  img {
    width: 6vh;
    height: 6vh;
  }
}

.button-general {
  .scale(0.95);
  border-radius: 1vmax;
  cursor: pointer;
  font-weight: bold;

  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  align-self: center;

	box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.75);
}

.button--statistics {
  .button-general();
  width: 60%;
  height: 40%;
  font-size: 4vh;
  justify-self: center;

	background: var(--stats-button);
	color: var(--stats-button-text);
}

.button-control {
  .button-general();
  width: 33%;
  height: 60%;
  font-size: 6vh;
  align-self: center;
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
