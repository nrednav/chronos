<template>
  <div class="stats--history">
    <div class="stats--history-title">History</div>
    <div class="stats--history-list-header">
      Solve #
      <div>Solve Time</div>
      <div>Date</div>
    </div>
    <div class="stats--history-list" v-if="history.length > 0">
      <div
        class="stats--history-list-item"
        v-for="(stat, index) in history"
        :key="index"
      >
        {{ index + 1 }}.
        <div>
          {{ stat.solve_time }}
        </div>
        <div>
          {{ stat.date.substr(0, stat.date.indexOf("T")) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

const storage = require("@/utils/appStorage.js");

export default Vue.extend({
  data(): {
    history: Array<any>;
  } {
    return {
      history: new Array<any>()
    };
  },
  mounted() {
    let stats = storage.load("user_data/stats.json");
    setTimeout(() => {
      if (stats.history.length > 15) {
        this.history = stats.history
          .splice(stats.history.length - 15, 15)
          .reverse();
      } else {
        this.history = stats.history.reverse();
      }
    }, 0);
  }
});
</script>

<style lang="less">
@import "../../assets/styles/global.less";

.stats--history {
  margin-bottom: 12vh;
  display: grid;
  grid-template-rows: 12vh 6vh auto;
  align-items: center;

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--history-scrollbar-thumb);
    border-radius: 10px;
  }

  &-title {
    grid-row: 1;
    font-size: 6vh;
    font-weight: bold;
    height: 12vh;

    .line-divider(~"90%");
  }

  &-list {
    grid-row: 3;
    width: 75%;
    height: 60vh;
    justify-self: center;
    overflow-y: scroll;

    .list-item-base {
      margin-right: 3vh;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      align-items: center;
      justify-items: center;
    }

    &-header {
      .list-item-base();
      width: 75%;
      justify-self: center;
      color: var(--history-list-header);
    }

    &-item {
      height: 12vh;
      margin: 6vh 0;
      border: 1px solid var(--gutter-grey);
      border-radius: 1vmax;
      background: var(--history-listItem-bg);
      .list-item-base();
    }
  }
}
</style>
