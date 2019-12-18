const storage = require("@/utils/appStorage");

function resetAllStats() {
  let stats = {
    best_time: "N/A",
    best_time_value: 6000000,
    history: []
  };
  storage.save("user_data/stats.json", stats);
}

export default {
  resetAllStats
};
