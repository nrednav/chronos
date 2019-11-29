<template>
  <div id="app-main">
    Main
    <br />
    <router-link to="/">Home</router-link>
    <br />
    <router-link to="/stats">Stats</router-link>
    <br />
    <router-link to="/settings">Settings</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
@import "../assets/styles/colors.less";

#app-settings {
  width: 100%;
  height: 100%;
}
</style>
