<template>
  <div class="main__timer" v-if="timer">
    <div class="main__timer-clock" v-show="!warmupInitiated">
      00:00:00
    </div>
    <div class="main__timer-control" v-show="!warmupInitiated">
      <div
        class="button--control button--start-timer"
        v-show="!timerRunning && !promptSaveSolve"
        @click="initWarmup"
      >
        START
      </div>
      <div
        class="button--control button--stop-timer"
        v-show="timerRunning && !promptSaveSolve"
        @click="stopTimer"
      >
        STOP
      </div>
      <div class="save-solve-dialog" v-show="promptSaveSolve">
        <div class="button--control button--red" @click="handleSavePrompt">
          DISCARD
        </div>
        <div
          class="button--control button--green"
          @click="handleSavePrompt('save')"
        >
          SAVE
        </div>
      </div>
    </div>
    <div class="main__timer-warmup" v-show="warmupInitiated"></div>
  </div>
</template>

<script>
import Stopwatch from "@/utils/stopwatch.js";

export default {
  components: {},

  props: ["stats", "storage", "warmupInitiated", "timerRunning"],

  data() {
    return {
      timer: null,
      warmupDuration: 0,
      promptSaveSolve: null
    };
  },

  methods: {
    startTimer() {
      this.$emit("propUpdated", {
        name: "warmupInitiated",
        value: false
      });

      this.timer.reset();
      this.timer.start();

      this.$emit("propUpdated", {
        name: "timerRunning",
        value: true
      });
    },

    stopTimer() {
      this.timer.stop();
      this.$emit("propUpdated", {
        name: "timerRunning",
        value: false
      });
      this.promptSaveSolve = true;
    },

    initWarmup() {
      this.$emit("propUpdated", {
        name: "warmupInitiated",
        value: true
      });

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

    handleSpacebar(e) {
      if (e.keyCode === 32 && !this.warmupInitiated) {
        this.timerRunning ? this.stopTimer() : this.initWarmup();
      }
    },

    handleSavePrompt(decision) {
      if (decision === "save") {
        this.stats.history.push({
          date: new Date(),
          solve_time: this.timer.getTime()
        });
        this.storage.save("user_data/stats.json", this.stats);
      }
      this.promptSaveSolve = false;
    }
  },

  mounted() {
    this.timer = new Stopwatch();

    let settings = this.storage.load("config/app-settings.json");
    settings.sections["General"].options.find(option => {
      if (option.name === "warmupDuration") this.warmupDuration = option.value;
    });

    document.addEventListener("keyup", this.handleSpacebar);
  },

  beforeDestroy() {
    document.removeEventListener("keyup", this.handleSpacebar);
  }
};
</script>

<style lang="less">
.main {
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
}

.save-solve-dialog {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
</style>
