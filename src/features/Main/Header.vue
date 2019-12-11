<template>
  <div class="main__header">
    <div class="button--home" @click="goHome">
      <img src="@/assets/icons/home-dark.svg" v-show="!darkThemeEnabled" />
      <img src="@/assets/icons/home.svg" v-show="darkThemeEnabled" />
    </div>
    <div class="main__scramble">
      {{ cubeScramble }}
    </div>
    <div class="main__scramble-button" @click="generateScramble">
      <img src="@/assets/icons/refresh.svg" />
    </div>
  </div>
</template>

<script>
import generateScramble from "@/utils/cubeScrambler.js";

export default {
  props: ["darkThemeEnabled"],

  data() {
    return {
      cubeScramble: generateScramble()
    };
  },

  methods: {
    goHome() {
      this.$router.push("/");
    },

    generateScramble() {
      let refreshImage = document.querySelector(".main__scramble-button img");
      refreshImage.classList.add("rotato");
      setTimeout(() => {
        refreshImage.classList.remove("rotato");
        this.cubeScramble = generateScramble();
      }, 500);
    }
  }
};
</script>

<style lang="less">
.main {
  &__header {
    display: grid;
    grid-template-columns: 16% 68% 16%;
  }

  &__scramble {
    font-size: 3vh;
    padding: 0 2%;
    align-self: center;

    &-button {
      align-self: center;
      cursor: pointer;

      img {
        width: 6vh;
        height: 6vh;
      }
    }
  }
}

.rotato {
  transition: all 0.5s ease-in-out;
  transform: rotate(360deg);
}
</style>
