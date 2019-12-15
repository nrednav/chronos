<template>
  <div class="stats--header">
    <div class="stats--button-back">1</div>
    <div class="stats--header-title">2</div>
    <div class="stats--button-home">3</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="less">
.stats--header {
  background: red;
  height: 18vh;

  display: grid;
  grid-template-columns: 15% 70% 15%;

  &-title {
    border: 1px solid white;
  }
}

.stats--button-home {
  border: 1px solid white;
}

.stats--button-back {
  border: 1px solid white;
}
</style>
