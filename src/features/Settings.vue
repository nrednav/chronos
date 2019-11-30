<template>
  <div id="app-settings">
    <div id="panel-list">
      <div id="panel-list-item" v-for="(panel, index) in panels" :key="index">
        {{ panel }}
      </div>
      <div id="settings-home-button" @click="$router.push('/')">
        Home
      </div>
    </div>
    <div id="panel">2</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      panels: ["1", "2", "3"]
    };
  }
};
</script>

<style lang="less">
@import "../assets/styles/colors.less";

#app-settings {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 25% 75%;

  #panel-list {
    //border-right: 2px solid fade(@gutter-grey, 20%);
    background: darken(@background, 10%);
    position: relative;

    #panel-list-item {
      border-bottom: 2px solid fade(@gutter-grey, 20%);
      border-right: 2px solid fade(@gutter-grey, 20%);
      height: 9%;
      background: @background;

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

      background: darken(@background, 40%);
      color: white;
      cursor: pointer;
    }
  }

  #panel {
  }
}
</style>
