const storage = require("@/utils/appStorage.js");

/* ------------------------------------------------------------------------------------------------
 * HELPER FUNCTIONS
 * ------------------------------------------------------------------------------------------------
 */
function computeAverage(arr) {
  return arr.reduce((a, b) => a + b, 0) / 5;
}

function formatTime(value) {
  let seconds = parseInt(value / 1000).toString();
  let minutes = parseInt(value / 60000).toString();
  let milliseconds = parseInt(
    value - minutes * 60000 - seconds * 1000
  ).toString();

  if (minutes.length < 2) minutes = "0" + minutes;
  if (seconds.length < 2) seconds = "0" + seconds;
  if (milliseconds.length < 3) milliseconds = "0" + milliseconds;

  return `${minutes}:${seconds}.${milliseconds.substr(0, 2)}`;
}

function getDateStr(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

function extractDateStr(str) {
  return str.substr(0, str.indexOf("T"));
}

function dateDifference(a, b) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utcB - utcA) / MS_PER_DAY);
}

function timeframeIsValid(otherDate, diffMax) {
  let today = new Date();
  let otherDay = new Date(extractDateStr(otherDate));
  let dateDiff = dateDifference(today, otherDay);
  return Math.abs(dateDiff) < diffMax;
}

/* ------------------------------------------------------------------------------------------------
 * MAIN FUNCTIONS
 * ------------------------------------------------------------------------------------------------
 */

function getAvg(timeframe) {
  let stats = storage.load("user_data/stats.json");

  if (timeframe === "daily") {
    return computeDailyAvg(stats);
  } else if (timeframe === "weekly") {
    return computeWeeklyAvg(stats);
  } else if (timeframe === "monthly") {
    return computeMonthlyAvg(stats);
  } else if (timeframe === "past5") {
    return computeAvgOfPast5(stats);
  } else {
    return "N/A";
  }
}

function computeDailyAvg(stats) {
  let todaysSolveTimes = [];
  let today = new Date();
  stats.history.find(stat => {
    if (stat.date.substr(0, 10) === getDateStr(today)) {
      todaysSolveTimes.push(stat.solve_time_value);
    }
  });

  let dailyAvg = computeAverage(todaysSolveTimes);
  return formatTime(dailyAvg);
}

function computeWeeklyAvg(stats) {
  let weeklySolveTimes = [];

  for (let i = stats.history.length - 1; i >= 0; i--) {
    if (timeframeIsValid(stats.history[i].date, 8))
      weeklySolveTimes.push(stats.history[i].solve_time_value);
    else break;
  }

  let weeklyAvg = computeAverage(weeklySolveTimes);
  return formatTime(weeklyAvg);
}

function computeMonthlyAvg(stats) {
  let monthlySolveTimes = [];

  for (let i = stats.history.length - 1; i >= 0; i--) {
    if (timeframeIsValid(stats.history[i].date, 30))
      monthlySolveTimes.push(stats.history[i].solve_time_value);
    else break;
  }

  let monthlyAvg = computeAverage(monthlySolveTimes);
  return formatTime(monthlyAvg);
}

function computeAvgOfPast5(stats) {
  let historyLength = stats.history.length;
  if (historyLength < 5) {
    return "N/A";
  }

  let past5 = stats.history.slice(historyLength - 5, historyLength);
  let solveTimes = past5.map(obj => obj.solve_time_value);

  let average = computeAverage(solveTimes);
  return formatTime(average);
}

function getBestTime() {
  let stats = storage.load("user_data/stats.json");
  return stats.best_time;
}

export default {
  getBestTime,
  getAvg
};
