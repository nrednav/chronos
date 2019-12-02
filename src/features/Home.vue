<template>
  <div id="app-home">
    <div id="secondary-buttons-container">
      <div id="theme-switch" ref="themeSwitch">
        <input type="checkbox" name="" @click="toggleDarkTheme" />
      </div>
      <div id="btn-settings" @click="$router.push('/settings')">
        <img
          src="@/assets/icons/cog-dark.svg"
          alt="settings icon"
          v-show="!$store.state.darkThemeEnabled"
        />
        <img
          src="@/assets/icons/cog-light.svg"
          alt="settings icon"
          v-show="$store.state.darkThemeEnabled"
        />
      </div>
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
        STATISTICS
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
const storage = require("../utils/appStorage.js");

function checkThemeSwitch() {
  const body = document.querySelector("body");
  const darkThemeEnabled = body.classList.contains("dark-theme");
  if (darkThemeEnabled) {
    document.querySelector("#theme-switch input").checked = true;
  }
}

export default {
  methods: {
    toggleDarkTheme() {
      const body = document.querySelector("body");
      body.classList.toggle("dark-theme");
      const darkThemeEnabled = body.classList.contains("dark-theme");
      this.updateSettings(darkThemeEnabled, "Appearance");
    },

    updateSettings(status, section) {
      const settings = storage.loadSettings();
      settings.sections[section].darkThemeEnabled = status;
      storage.saveSettings(settings);
    }
  },
  mounted() {
    setTimeout(checkThemeSwitch, 0);
  }
};
</script>

<style lang="less">
#app-home {
  display: grid;
  grid-template-rows: 15vh 45vh 30vh;

  #secondary-buttons-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    #theme-switch {
      padding-left: 2.5vw;

      input[type="checkbox"] {
        position: relative;
        height: 30px;
        width: 60px;
        appearance: none;
        background: #c6c6c6;
        outline: none;
        border-radius: 15px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        transition: 0.5s;
      }

      input:checked[type="checkbox"] {
        background: var(--blue);
      }

      input[type="checkbox"]:before {
        content: "";
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 20px;
        top: 0;
        left: 0;
        background: white;
        transition: 0.5s;
        transform: scale(1.1);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }

      input:checked[type="checkbox"]:before {
        left: 30px;
      }
    }

    #btn-settings {
      padding-right: 2.5vw;
      transition: all 0.2s ease-in-out;
      cursor: pointer;

      &:hover {
        transform: scale(0.9);
      }

      img {
        width: 40px;
        height: 40px;
      }
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
      width: 33%;
      height: 100%;
      border-radius: 1vmax;
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.75);
      transition: all 0.2s ease-in-out;
      cursor: pointer;

      font-size: 3vmax;
      font-weight: bold;

      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        transform: scale(1.1);
      }
    }

    #btn-start-app {
      background: var(--green);
      color: darken(#98c379, 30%);
    }

    #btn-view-statistics {
      background: var(--yellow);
      color: darken(#e5c07b, 30%);
    }
  }
}
</style>
