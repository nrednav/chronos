<template>
  <div class="main">
    <Header :darkThemeEnabled="darkThemeEnabled" />
    <Timer
      :stats="$options.stats"
      :storage="$options.storage"
      :warmupInitiated="warmupInitiated"
      :timerRunning="timerRunning"
      @propUpdated="updateParent"
      @statsUpdated="updateStats"
    />
    <Stats
      :stats="$options.stats"
      :warmupInitiated="warmupInitiated"
      @goStats="goStats"
      ref="statsComponent"
    />
  </div>
</template>

<script>
import Header from "@/features/Main/Header.vue";
import Timer from "@/features/Main/Timer.vue";
import Stats from "@/features/Main/Stats.vue";

const storage = require("@/utils/appStorage.js");
const stats = storage.load("app-stats.json");
const fileDepsHelper = require("@/utils/fileDepsHelper.js").default;

export default {
  stats,
  storage,

  components: {
    Header,
    Timer,
    Stats
  },

  data() {
    return {
      darkThemeEnabled: null,
      warmupInitiated: null,
      timerRunning: false
    };
  },

  methods: {
    goStats() {
      if (this.timerRunning) this.stopTimer();
      this.$router.push("/stats");
    },

    checkTheme() {
      let body = document.querySelector("body");
      this.darkThemeEnabled = body.classList.contains("dark-theme");
    },

    updateParent(obj) {
      this[obj.name] = obj.value;
    },

    updateStats() {
      this.$refs.statsComponent.computeAvgOf5();
    }
  },

  beforeCreate() {
    fileDepsHelper.checkExistenceFileDeps();
  },

  mounted() {
    this.$nextTick(this.checkTheme);
  },

  updated() {
    this.checkTheme();
  }
};
</script>

<style lang="less">
@import "../../assets/styles/colors.less";
@import "../../assets/styles/global.less";

.main {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: 20% 50% 30%;
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

.button--general {
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
  .button--general();
  width: 60%;
  height: 40%;
  font-size: 3vmax;
  justify-self: center;

  background: var(--stats-button);
  color: var(--stats-button-text);
}

.button--control {
  .button--general();
  width: 33%;
  height: 60%;
  font-size: 6vh;
  align-self: center;
}

.button--green {
  background: var(--green);
  color: darken(#98c379, 30%);
}

.button--red {
  background: var(--dark-red);
  color: pink;
}

.button--start-timer {
  .button--green();
}

.button--stop-timer {
  .button--red();
}
</style>
