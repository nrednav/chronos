<template>
  <div id="app-settings">
    <div id="panel-list">
      <div
        id="panel-list-item"
        v-for="(value, name, index) in $options.settings.sections"
        :key="index"
        @click="viewPanel(name, value)"
      >
        {{ name }}
      </div>
      <div id="settings-home-button" @click="$router.push('/')">
        Home
      </div>
    </div>
    <div id="panel" v-if="panelWasClicked">
      <div id="panel-heading">
        {{ activePanel.name }}
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
const fs = require("fs");
const appSettings = JSON.parse(fs.readFileSync("src/app-settings.json"));

export default {
  settings: appSettings,

  data() {
    return {
      activePanel: {},
      panelWasClicked: false
    };
  },

  methods: {
    viewPanel(name, value) {
      let item = event.target;
      this.resetClassList(item.parentElement);
      item.classList.add("active-li");

      let keys = Object.keys(this.activePanel);
      if (keys.indexOf(name) === -1) this.activePanel = { name, value };
      this.panelWasClicked = true;
    },
    resetClassList(parent) {
      let children = Array.from(parent.children);
      children.forEach(child => {
        if (child.classList.contains("active-li"))
          child.classList.remove("active-li");
      });
    }
  }
};
</script>

<style lang="less">
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

      cursor: pointer;
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
    #panel-heading {
      height: 18%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      font-size: 9vh;
      padding-right: 3vw;
    }
  }

  .active-li {
    border-right: 4px solid var(--blue);
  }
}
</style>
