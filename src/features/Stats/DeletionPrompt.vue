<template>
  <div class="deletion-prompt">
    <div class="deletion-prompt--box">
      <div class="deletion-prompt--text">Are you sure?</div>
      <div class="deletion-prompt--buttons">
        <div class="deletion--button-confirm">Confirm</div>
        <div class="deletion--button-cancel">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="less">
@import "../../assets/styles/global.less";

.deletion-prompt {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  &--box {
    width: 75%;
    height: 33vh;
    background: var(--background);
    border-radius: 1vmax;

    display: grid;
    grid-template-rows: repeat(2, 1fr);
  }

  &--text {
    font-size: 6vh;
  }

  &--buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
}
</style>
