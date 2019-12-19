const fs = require("fs");
const path = require("path");
const electron = require("electron");

const userDataPath = (electron.app || electron.remote.app).getPath("userData");

function load(filename) {
  let filePath = path.join(userDataPath, "/" + filename);
  return JSON.parse(fs.readFileSync(filePath));
}

function save(filename, object) {
  let filePath = path.join(userDataPath, "/" + filename);
  fs.writeFile(filePath, JSON.stringify(object, null, 2), err => {
    if (err) throw err;
  });
}

export { load, save };
