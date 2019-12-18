<template>
  <div class="prompt">
    <div class="prompt--box">
      <div class="prompt--text">
        <slot name="promptText"></slot>
      </div>
      <div class="prompt--buttons">
        <div class="prompt--button-cancel" @click="cancel">
          Cancel
        </div>
        <div class="prompt--button-action" @click="confirmAction">
          <slot name="actionButtonText"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["stat"],
  methods: {
    cancel(): void {
      this.$emit("decisionMade", false);
    },
    confirmAction(): void {
      this.$emit("decisionMade", true);
    }
  }
});
</script>

<style lang="less">
@import "../assets/styles/global.less";

.prompt {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;

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
    font-size: 4vh;
    color: var(--text-color);
    align-self: center;
  }

  &--buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
}

.prompt--button {
  width: 33%;
  height: 66%;
  border-radius: 1vmax;

  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  font-size: 6vh;
  font-weight: bold;

  cursor: pointer;
  .scale(0.95);
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.75);
}

.prompt--button-action {
  .prompt--button();
  background: var(--dark-red);
  color: pink;
}

.prompt--button-cancel {
  .prompt--button();
  background: var(--prompt-cancel-button);
  color: fade(black, 50%);
}
</style>
