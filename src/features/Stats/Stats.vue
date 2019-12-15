<template>
  <div id="stats">
    <Header />
    <Main />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Header from "@/features/Stats/Header.vue";
import Main from "@/features/Stats/Main.vue";

export default Vue.extend({
  components: {
    Header,
    Main
  },
  data() {
    return {};
  }
});
</script>

<style lang="less">
@import "../../assets/styles/colors.less";

#stats {
  width: 100%;
  background: black;
  color: white;
}
</style>
