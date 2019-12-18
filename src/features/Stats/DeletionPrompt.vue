<template>
  <div class="deletion-prompt">
    <div class="deletion-prompt--box">
      <div class="deletion-prompt--text">
        Are you sure you want to delete this stat?
      </div>
      <div class="deletion-prompt--stat">
        <div class="deletion--stat-property">
          <div class="deletion--stat-title">Solve Time</div>
          <div class="deletion--stat-value">{{ stat.solve_time }}</div>
        </div>
        <div class="deletion--stat-property">
          <div class="deletion--stat-title">Date</div>
          <div class="deletion--stat-value">
            {{ stat.date.substr(0, stat.date.indexOf("T")) }}
          </div>
        </div>
      </div>
      <div class="deletion-prompt--buttons">
        <div class="deletion--button-cancel" @click="cancelDelection">
          Cancel
        </div>
        <div class="deletion--button-delete" @click="confirmDeletion">
          Delete
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
    cancelDelection(): void {
      this.$emit("decisionMade", {
        decision: false,
        index: this.stat.index
      });
    },
    confirmDeletion(): void {
      this.$emit("decisionMade", {
        decision: true,
        index: this.stat.index
      });
    }
  }
});
</script>

<style lang="less">
@import "../../assets/styles/global.less";

.deletion-prompt {
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
    height: 50vh;
    background: var(--background);
    border-radius: 1vmax;

    display: grid;
    grid-template-rows: repeat(3, 1fr);
  }

  &--text {
    grid-row: 1;
    font-size: 4vh;
    color: var(--text-color);
    align-self: center;
  }

  &--stat {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  &--buttons {
    grid-row: 3;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
}

.deletion--stat {
  &-property {
    width: 18vw;
  }

  &-title {
    padding: 5%;
    font-size: 3vh;
    font-weight: bold;
    color: var(--text-color);
    .line-divider(~"100%");
  }
  &-value {
    padding: 5%;
    font-size: 3vh;
    color: var(--history-list-header);
  }
}

.deletion--button {
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

.deletion--button-delete {
  .deletion--button();
  background: var(--dark-red);
  color: pink;
}

.deletion--button-cancel {
  .deletion--button();
  background: var(--stat-delete-button);
  color: fade(black, 50%);
}
</style>
