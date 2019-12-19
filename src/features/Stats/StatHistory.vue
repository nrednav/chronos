<template>
  <div class="stats--history">
    <DeletionPrompt
      :stat="selectedStat"
      v-show="showDeletionPrompt"
      @decisionMade="handleDecision"
    />
    <div class="stats--history-title">History</div>
    <div class="stats--history-unavailable" v-if="history.length === 0">
      No stats to show.
    </div>
    <div class="stats--history-list-header" v-if="history.length > 0">
      Solve #
      <div>Solve Time</div>
      <div>Date / Time</div>
    </div>
    <div class="stats--history-list" v-if="history.length > 0">
      <div
        class="stats--history-list-item"
        v-for="(stat, index) in history"
        :key="index"
      >
        <div class="hli--solve-number">{{ index + 1 }}.</div>
        <div class="hli--solve-time">
          {{ stat.solve_time }}
        </div>
        <div class="hli--solve-date">
          {{ stat.date.substr(0, stat.date.indexOf("T")) }}<br />
          {{ stat.date.substr(stat.date.indexOf("T") + 1, 5) }}
        </div>
        <div class="hli--delete-stat" @click="openDeletionPrompt(stat, index)">
          <img src="@/assets/icons/delete.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DeletionPrompt from "@/features/Stats/DeletionPrompt.vue";

const storage = require("@/utils/appStorage.js");

export default Vue.extend({
  components: {
    DeletionPrompt
  },
  data(): {
    history: Array<any>;
    showDeletionPrompt: boolean;
    selectedStat: any;
  } {
    return {
      history: new Array<any>(),
      showDeletionPrompt: false,
      selectedStat: null
    };
  },
  methods: {
    openDeletionPrompt(stat: any, index: number): void {
      stat.index = index;
      this.selectedStat = stat;
      this.showDeletionPrompt = true;
    },
    handleDecision(result: any): void {
      if (result.decision === false) {
        this.showDeletionPrompt = false;
        return;
      }
      this.showDeletionPrompt = false;
      this.deleteStat(result.index);
    },
    deleteStat(index: number): void {
      this.history.splice(index, 1);

      let stats = storage.load("app-stats.json");
      if (stats.history.length > 15) {
        stats.history.splice(stats.history.length - 15, 15);
        stats.history = stats.history.concat(this.history);
      } else {
        stats.history = this.history;
      }
      storage.save("app-stats.json", stats);

      setTimeout(() => {
        if (stats.history.length > 15) {
          this.history = stats.history.splice(stats.history.length - 15, 15);
        } else {
          this.history = stats.history;
        }
      }, 0);
    }
  },
  mounted() {
    let stats = storage.load("app-stats.json");
    setTimeout(() => {
      if (stats.history.length > 15) {
        this.history = stats.history.splice(stats.history.length - 15, 15);
      } else {
        this.history = stats.history;
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
      text-align: center;
    }

    &-header {
      .list-item-base();
      width: 75%;
      justify-self: center;
      color: var(--history-list-header);
      font-weight: bold;
      font-size: 3vh;
    }

    &-item {
      height: 18vh;
      margin: 6vh 0;
      border: 1px solid var(--gutter-grey);
      border-radius: 1vmax;
      background: var(--history-listItem-bg);
      .list-item-base();
    }
  }
}

.hli {
  &--delete-stat img {
    width: 6vh;
    height: 6vh;

    &:hover {
      .scale(1.1);
      cursor: pointer;
    }
  }
}
</style>
