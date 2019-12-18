<template>
  <div id="app-home">
    <div id="btn-settings" @click="$router.push('/settings')">
      <img
        src="@/assets/icons/cog-dark.svg"
        alt="settings icon"
        v-show="!darkThemeEnabled"
      />
      <img
        src="@/assets/icons/cog-light.svg"
        alt="settings icon"
        v-show="darkThemeEnabled"
      />
    </div>
    <div id="hero-container">
      <div class="hero-title">Chronos</div>
      <div class="hero-subtitle">A Simple Rubik's Cube Timer & Tracker</div>
    </div>
    <div id="primary-buttons-container">
      <div
        class="primary-button"
        id="btn-view-statistics"
        @click="$router.push('/stats')"
      >
        STATS
      </div>
      <div
        class="primary-button"
        id="btn-start-app"
        @click="$router.push('/main')"
      >
        START
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkThemeEnabled: null
    };
  },
  methods: {
    checkTheme() {
      let body = document.querySelector("body");
      this.darkThemeEnabled = body.classList.contains("dark-theme");
    }
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
@import "../assets/styles/global.less";

#app-home {
  display: grid;
  grid-template-rows: 15vh 45vh 40vh;

  #btn-settings {
    .scale(0.9);
    align-self: center;
    justify-self: end;
    padding-right: 3vw;
    cursor: pointer;

    img {
      width: 5vw;
      height: 5vw;
    }
  }

  #hero-container {
    align-self: center;
    user-select: none;

    .hero-title {
      font-size: 18vh;
    }
    .hero-subtitle {
      padding-top: 2vh;
      font-size: 4vh;
    }
  }

  #primary-buttons-container {
    width: 75%;
    height: 35%;
    align-self: center;
    justify-self: center;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .primary-button {
      .scale(1.1);
      width: 33%;
      height: 100%;
      border-radius: 1vmax;
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.75);
      cursor: pointer;

      font-size: 3vmax;
      font-weight: bold;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    #btn-start-app {
      background: var(--green);
      color: darken(#98c379, 30%);
    }

    #btn-view-statistics {
      background: var(--stats-button);
      color: var(--stats-button-text);
    }
  }
}
</style>
