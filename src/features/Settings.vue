<template>
  <div id="app-settings">
    <div id="panel-list">
      <div
        id="panel-list-item"
        v-for="(panel, index) in $options.settings.panels"
        :key="index"
      >
        {{ panel.name }}
      </div>
      <div id="settings-home-button" @click="$router.push('/')">
        Home
      </div>
    </div>
    <div id="panel">2</div>
  </div>
</template>

<script>
import appSettings from "@/app-settings.json";
export default {
  settings: appSettings,
  data() {
    return {};
  }
};
</script>

<style lang="less">
//@import "../assets/styles/colors.less";

#app-settings {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 25% 75%;

  #panel-list {
    background: var(--panel-list-bg);
    position: relative;
    border-right: 2px solid var(--panel-li-border);

    #panel-list-item {
      border-bottom: 2px solid var(--panel-li-border);
      height: 9%;
      background: var(--background);

      display: flex;
      justify-content: center;
      align-items: center;
    }

    #settings-home-button {
      position: absolute;
      bottom: 4%;
      left: 12.5%;
      height: 9vh;
      width: 75%;

      display: flex;
      justify-content: center;
      align-items: center;

      background: black;
      color: white;
      cursor: pointer;
    }
  }

  #panel {
  }
}
</style>
