<template>
  <div class="stats--header">
    <div class="stats--header-button" @click="$router.go(-1)">
      <img src="@/assets/icons/back-light.svg" v-show="darkThemeEnabled" />
      <img src="@/assets/icons/back-dark.svg" v-show="!darkThemeEnabled" />
    </div>
    <div class="stats--header-title">
      STATS
    </div>
    <div class="stats--header-button" @click="$router.push('/')">
      <img src="@/assets/icons/home.svg" v-show="darkThemeEnabled" />
      <img src="@/assets/icons/home-dark.svg" v-show="!darkThemeEnabled" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      darkThemeEnabled: true
    };
  },

  methods: {
    checkTheme() {
      let body = document.querySelector("body");
      this.darkThemeEnabled = body.classList.contains("dark-theme");
    }
  },

  mounted() {
    this.$nextTick(this.checkTheme);
  },

  updated() {
    this.$nextTick(this.checkTheme);
  }
});
</script>

<style lang="less">
@import "../../assets/styles/global.less";

.stats--header {
  height: 18vh;

  display: grid;
  grid-template-columns: 15% 70% 15%;

  &-title {
    color: var(--text-color);
    align-self: center;
    font-size: 6vh;
    font-weight: bold;
    letter-spacing: 2px;

    .line-divider(~"75%");
  }

  &-button {
    .scale(0.9);
    align-self: center;
    cursor: pointer;

    img {
      width: 6vh;
      height: 6vh;
    }
  }
}
</style>
