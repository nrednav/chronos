const fs = require("fs");

function loadSettings() {
  return JSON.parse(fs.readFileSync("config/app-settings.json"));
}

function saveSettings(settings) {
  fs.writeFile(
    "config/app-settings.json",
    JSON.stringify(settings, null, 2),
    err => {
      if (err) throw err;
    }
  );
}

export { loadSettings, saveSettings };
