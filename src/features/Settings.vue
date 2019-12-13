<template>
  <div id="app-settings">
    <div id="panel-list">
      <div
        id="panel-list-item"
        v-for="(value, name, index) in $options.settings.sections"
        :key="index"
        @click="viewPanel(name, value)"
      >
        {{ name }}
      </div>
      <div id="settings-home-button" @click="goHome">
        <img src="@/assets/icons/home-dark.svg" v-show="!darkThemeEnabled" />
        <img src="@/assets/icons/home.svg" v-show="darkThemeEnabled" />
      </div>
    </div>
    <div id="panel" v-if="panelWasClicked">
      <div id="settings-changed-dialog" v-if="settingsChanged">
        <div class="unsaved-changes-text">
          The changes you have made are currently unsaved.
        </div>
        <div
          @click="saveSettings"
          class="btn-save-changes settings-changed-btn"
        >
          Save
        </div>
        <div
          @click="discardChanges"
          class="btn-discard-changes settings-changed-btn"
        >
          Discard
        </div>
      </div>
      <div id="panel-heading">
        {{ activePanel.name }}
      </div>
      <hr />
      <div id="panel-options">
        <div
          class="panel-option"
          v-for="(option, index) in activePanel.value.options"
          :key="index"
        >
          <div class="panel-option-input">
            <label
              class="checkmark"
              :for="`option-checkbox-${index}`"
              v-if="option.inputType === 'checkbox'"
            >
              <input
                :checked="option.value"
                :id="`option-checkbox-${index}`"
                type="checkbox"
                class="checkmark__input"
                @click="handleCheckboxInput(option, index)"
              />
              <div class="checkmark__box"></div>
            </label>
            <!-- .checkmark -->

            <div class="input--normal" v-if="option.inputType === 'normal'">
              <input
                type="text"
                :id="`option-textfield-${index}`"
                maxlength="2"
                :value="option.value"
                @change="handleTextInput(option, index)"
              />
            </div>
            <!-- .input normal -->
          </div>
          <div class="panel-option-description">
            {{ option.description }}
          </div>
        </div>
        <!-- .panel-option -->
      </div>
      <!-- #panel-options -->
    </div>
    <!-- #panel -->
  </div>
</template>

<script>
const storage = require("../utils/appStorage.js");
const appSettings = storage.load("config/app-settings.json");

export default {
  settings: appSettings,

  data() {
    return {
      darkThemeEnabled: false,
      activePanel: {},
      panelWasClicked: false,
      settingsChanged: false,
      unsavedChanges: new Map()
    };
  },

  methods: {
    viewPanel(name, value) {
      let item = event.target;
      this.resetClassList(item.parentElement);
      item.classList.add("active-li");

      let keys = Object.keys(this.activePanel);
      if (keys.indexOf(name) === -1) this.activePanel = { name, value };
      this.panelWasClicked = true;
    },

    resetClassList(parent) {
      let children = Array.from(parent.children);
      children.forEach(child => {
        if (child.classList.contains("active-li"))
          child.classList.remove("active-li");
      });
    },

    goHome() {
      this.discardChanges();
      this.$router.push("/");
    },

    handleCheckboxInput(option, index) {
      this.activePanel.value.options[index].value = !option.value;

      let firstValue = !option.value;
      if (this.unsavedChanges.get(option.name)) {
        firstValue = this.unsavedChanges.get(option.name).firstValue;
      }

      let change = {
        panelName: this.activePanel.name,
        optionIndex: index,
        optionValue: option.value,
        firstValue
      };

      this.unsavedChanges.set(option.name, change);
      if (!this.settingsChanged) this.settingsChanged = true;
    },

    validateTextInput(event, index) {
      const validNumericInput = /^\d+$/;
      if (
        !validNumericInput.test(event.target.value) ||
        parseInt(event.target.value) < 0
      ) {
        if (this.settingsChanged) this.settingsChanged = false;
        this.activePanel.value.options[index].value = event.target.value;
        event.target.style.border = "1px solid red";
        event.target.focus();
        event.target.setAttribute(
          "title",
          "Please enter a positive numeric value."
        );
        return false;
      }
      return true;
    },

    handleTextInput(option, index) {
      if (!this.validateTextInput(event, index)) {
        return;
      }

      event.target.style.border = "1px solid white";
      let firstValue = this.activePanel.value.options[index].value;

      if (this.unsavedChanges.get(option.name)) {
        firstValue = this.unsavedChanges.get(option.name).firstValue;
      }

      let change = {
        panelName: this.activePanel.name,
        optionIndex: index,
        optionValue: option.value,
        firstValue
      };

      this.unsavedChanges.set(option.name, change);
      this.activePanel.value.options[index].value = event.target.value;
      if (!this.settingsChanged) this.settingsChanged = true;
    },

    discardChanges() {
      this.unsavedChanges.forEach(change => {
        let index = change.optionIndex;
        let firstValue = change.firstValue;
        this.$options.settings.sections[change.panelName].options[
          index
        ].value = firstValue;
      });
      this.unsavedChanges.clear();
      this.settingsChanged = false;
    },

    saveSettings() {
      storage.save("config/app-settings.json", this.$options.settings);
      this.unsavedChanges.clear();
      this.settingsChanged = false;
    },

    checkTheme() {
      const options = appSettings.sections["Appearance"].options;
      this.darkThemeEnabled = options.find(option => {
        if (option.name === "darkThemeEnabled") return option.value;
      });
      if (this.darkThemeEnabled !== null && this.darkThemeEnabled)
        document.querySelector("body").classList.add("dark-theme");
      else document.querySelector("body").classList.remove("dark-theme");
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.checkTheme();
      const panelList = document.querySelector("#panel-list");
      panelList.children[0].click();
    });
  },

  updated() {
    this.checkTheme();
  }
};
</script>

<style lang="less">
@import "../assets/styles/global.less";

#app-settings {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 25% 75%;

  #panel-list {
    background: var(--panel-list-bg);
    position: relative;
    border-right: 2px solid var(--panel-li-border);

    #panel-list-item {
      border-bottom: 2px solid var(--panel-li-border);
      height: 9%;
      background: var(--background);

      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;
      font-size: 3vh;
    }

    #settings-home-button {
      .scale(1.1);
      position: absolute;
      bottom: 4%;
      left: 25%;
      height: 9vh;
      width: 50%;
      border-radius: 10px;

      display: flex;
      justify-content: center;
      align-items: center;

      background: var(--background);
      cursor: pointer;

      img {
        width: 50%;
        height: 50%;
      }
    }
  }

  #panel {
    position: relative;

    hr {
      border: 0;
      height: 2px;
      background-image: linear-gradient(
        to left,
        var(--white),
        rgba(0, 0, 0, 0)
      );
    }

    #panel-heading {
      height: 18%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      font-size: 9vh;
      padding-right: 3vw;
    }

    .panel-option {
      display: flex;

      .panel-option-input {
        padding: 3% 5%;

        .checkmark {
          cursor: pointer;
        }

        .checkmark__input {
          display: none;

          &:checked + .checkmark__box {
            background: var(--blue);
            border-color: var(--blue);

            &::after {
              content: "\2714";
              color: white;
              font-size: 3vh;
            }
          }
        }

        .checkmark__box {
          width: 4vh;
          height: 4vh;
          border: 2px solid #ccc;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
      }

      .input--normal {
        input[type="text"] {
          background: var(--option-text-input);
          border: 0.1px solid var(--text-input-border);
          width: 12vh;
          height: 6vh;
          padding: 2vh;
          color: var(--text-color);
          font-size: 3vh;
          text-align: center;
          outline: none;
        }
      }

      .panel-option-description {
        align-self: center;
        font-size: 1.25em;
      }
    }
  }

  #settings-changed-dialog {
    position: absolute;
    bottom: 5%;
    left: 12.5%;

    width: 75%;
    height: 9%;
    border-radius: 5vmax;

    background: var(--panel-list-bg);
    color: white;
    text-align: center;

    display: flex;
    justify-content: space-evenly;
    flex-direction: row;

    .unsaved-changes-text {
      font-size: 1.25vw;
      align-self: center;
      color: var(--text-color);
    }

    .settings-changed-btn {
      .scale(1.1);
      height: 50%;
      align-self: center;
      font-size: 1.25vw;
      display: flex;
      align-items: center;
      text-align: center;
      padding: 0 3%;
      border-radius: 3vmax;
      cursor: pointer;
    }

    .btn-discard-changes {
      background: var(--dark-red);
      color: pink;
    }

    .btn-save-changes {
      background: var(--green);
      color: darkgreen;
    }
  }

  .active-li {
    border-right: 4px solid var(--blue);
  }
}
</style>
