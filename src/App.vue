<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
const fs = require("fs");

export default {
  methods: {
    updateSettings(status, section) {
      const settings = JSON.parse(fs.readFileSync("src/app-settings.json"));
      settings[section].darkThemeEnabled = status;
      fs.writeFile(
        "src/app-settings.json",
        JSON.stringify(settings, null, 2),
        err => {
          if (err) throw err;
          console.log("saved settings");
        }
      );
    }
  },

  mounted() {
    this.$nextTick(() => {
      const settings = JSON.parse(fs.readFileSync("src/app-settings.json"));
      const darkThemeEnabled = settings["appearance"].darkThemeEnabled;
      if (darkThemeEnabled !== null && darkThemeEnabled) {
        document.querySelector("body").classList.add("dark-theme");
        document.querySelector("#theme-switch input").checked = true;
      }
    });
  },

  updated() {
    console.log(
      "HANDLE DARK THEME PERSISTENCE OVER HERE by checking the route first"
    );
  }
};
</script>

<style lang="less">
@import "./assets/styles/colors.less";

*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background: var(--background);
  color: var(--text-color);

  height: 100vh;
  width: 100vw;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  height: 100%;
  width: 100%;
}
</style>
