const fs = require("fs");

function load(filename) {
  return JSON.parse(fs.readFileSync(filename));
}

function save(filename, object) {
  fs.writeFile(filename, JSON.stringify(object, null, 2), err => {
    if (err) throw err;
  });
}

export { load, save };
