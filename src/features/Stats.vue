<template>
  <div id="stats">
    <router-link to="/">Home</router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {};
  }
});
</script>

<style lang="less">
@import "../assets/styles/colors.less";

#stats {
  width: 100%;
}
</style>
