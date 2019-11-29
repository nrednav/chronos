<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
// Default color scheme
@black: #282c34;
@white: #abb2bf;
@light-red: #e06c75;
@dark-red: #be5046;
@green: #98c379;
@light-yellow: #e5c07b;
@orange: #d19a66;
@blue: #61afef;
@magenta: #c678dd;
@cyan: #56b6c2;
@gutter-grey: #4b5263;
@comment-grey: #5c6370;
@background: white;

.dark-theme {
  background: @black;
}

body {
  margin: 0;
  padding: 0;
  background: @background;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
