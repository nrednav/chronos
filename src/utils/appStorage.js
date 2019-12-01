const fs = require("fs");

function loadSettings() {
  return JSON.parse(fs.readFileSync("src/app-settings.json"));
}

function saveSettings(settings) {
  fs.writeFile(
    "src/app-settings.json",
    JSON.stringify(settings, null, 2),
    err => {
      if (err) throw err;
    }
  );
}

export { loadSettings, saveSettings };
