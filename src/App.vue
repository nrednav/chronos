<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
const storage = require("./utils/appStorage.js");
const fileDepsHelper = require("./utils/fileDepsHelper.js").default;

function checkDarkThemeEnabled() {
  const settings = storage.load("app-settings.json");
  const options = settings.sections["Appearance"].options;
  const darkThemeEnabled = options.find(option => {
    if (option.name === "darkThemeEnabled") return option.value;
  });
  if (darkThemeEnabled !== null && darkThemeEnabled) {
    document.querySelector("body").classList.add("dark-theme");
  }
}

export default {
  beforeCreate() {
    fileDepsHelper.checkExistenceFileDeps();
  },
  mounted() {
    this.$nextTick(checkDarkThemeEnabled);
  }
};
</script>

<style lang="less">
@import "./assets/styles/colors.less";
@import "./assets/styles/global.less";

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

  overflow-x: hidden;

  &::-webkit-scrollbar-track {
    background: var(--scrollbar-track-bg);
  }

  &::-webkit-scrollbar {
    width: 9px;
    background: var(--background);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--history-scrollbar-thumb);
    border-radius: 10px;
  }
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
