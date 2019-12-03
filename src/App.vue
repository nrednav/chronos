<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
const storage = require("./utils/appStorage.js");

function checkDarkThemeEnabled() {
  const settings = storage.loadSettings();
  const options = settings.sections["Appearance"].options;
  const darkThemeEnabled = options.find((option) => {
    if (option.name === "darkThemeEnabled") return option.value;
  });
  if (darkThemeEnabled !== null && darkThemeEnabled) {
    document.querySelector("body").classList.add("dark-theme");
  }
}

export default {
  mounted() {
    this.$nextTick(checkDarkThemeEnabled);
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
