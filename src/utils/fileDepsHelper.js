// File dependency helper
// -> This module contains helper functions to deal with regeneration of files that the
//    application depends on.
// -> For example, the stats and settings files.
// -> It also includes helper functions for altering content within those files

const fs = require("fs");
const electron = require("electron");
const storage = require("@/utils/appStorage");
const path = require("path");

const userDataPath = (electron.app || electron.remote.app).getPath("userData");

function resetAllStats() {
  regenerateBaseStats();
}

function regenerateBaseStats() {
  let stats = {
    best_time: "N/A",
    best_time_value: 6000000,
    history: []
  };
  storage.save("app-stats.json", stats);
}

function regenerateBaseSettings() {
  let settings = {
    name: "Settings",
    sections: {
      General: {},
      Appearance: {},
      Statistics: {}
    }
  };

  settings.sections["General"].options = [
    {
      name: "warmupDuration",
      value: "5",
      description: "Warmup Duration (seconds)",
      inputType: "normal"
    }
  ];

  settings.sections["Appearance"].options = [
    {
      name: "darkThemeEnabled",
      value: true,
      description: "Dark Theme",
      inputType: "checkbox"
    }
  ];

  settings.sections["Statistics"].options = [
    {
      name: "resetAllStats",
      value: "RESET",
      description: "Reset all statistics",
      promptText: "Are you sure you want to reset all statistics?",
      inputType: "button",
      style: {
        backgroundColor: "var(--dark-red)",
        color: "pink"
      }
    }
  ];

  storage.save("app-settings.json", settings);
}

function checkExistenceFileDeps() {
  let settingsPath = path.join(userDataPath, "/app-settings.json");
  let statsPath = path.join(userDataPath, "/app-stats.json");

  if (!fs.existsSync(settingsPath)) {
    regenerateBaseSettings();
  }
  if (!fs.existsSync(statsPath)) {
    regenerateBaseStats();
  }
}

export default {
  resetAllStats,
  regenerateBaseStats,
  regenerateBaseSettings,
  checkExistenceFileDeps
};
