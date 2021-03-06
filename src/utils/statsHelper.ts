const storage = require("@/utils/appStorage");

/* ------------------------------------------------------------------------------------------------
 * HELPER FUNCTIONS
 * ------------------------------------------------------------------------------------------------
 */

function computeAverage(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function formatTime(value: number): string {
  let seconds = `${Math.floor(value / 1000)}`;
  let minutes = `${Math.floor(value / 60000)}`;
  let msValue = Math.floor(
    value - Number(minutes) * 60000 - Number(seconds) * 1000
  );
  let milliseconds = `${msValue}`;

  if (minutes.length < 2) minutes = "0" + minutes;
  if (seconds.length < 2) seconds = "0" + seconds;

  return `${minutes}:${seconds}.${milliseconds.substr(0, 2)}`;
}

function formatDate(date: Date): string {
  let day = date.getUTCDate();
  let month = date.getUTCMonth() + 1;
  let year = date.getUTCFullYear();

  return `${year}-${month}-${day}`;
}

// Extract date from timestamp stored in stats
function extractDateStr(str: string): string {
  return str.substr(0, str.indexOf("T"));
}

function differenceInDays(a: Date, b: Date): number {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utcB - utcA) / MS_PER_DAY);
}

// Checks whether a date falls within a max number of days before today
function isValidTimeframe(date: string, maxDifference: number): boolean {
  let today = new Date();
  let dateToCompare = new Date(extractDateStr(date));
  let difference = differenceInDays(today, dateToCompare);
  return Math.abs(difference) < maxDifference;
}

/* ------------------------------------------------------------------------------------------------
 * MAIN FUNCTIONS
 * ------------------------------------------------------------------------------------------------
 */

function getAvg(timeframe: string): string {
  let stats = storage.load("app-stats.json");

  if (stats.history.length === 0) {
    return "N/A";
  }

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

function computeDailyAvg(stats: any): string {
  let todaysSolveTimes: any = [];
  let today = new Date();

  stats.history.find((stat: any): void => {
    if (extractDateStr(stat.date) === formatDate(today)) {
      todaysSolveTimes.push(stat.solve_time_value);
    }
  });

  if (todaysSolveTimes.length === 0) return "N/A";

  let dailyAvg = computeAverage(todaysSolveTimes);
  return formatTime(dailyAvg);
}

function computeWeeklyAvg(stats: any): string {
  let weeklySolveTimes = [];

  for (let i = stats.history.length - 1; i >= 0; i--) {
    let dateOfStat = stats.history[i].date;
    let statSolveTime = stats.history[i].solve_time_value;

    if (isValidTimeframe(dateOfStat, 8)) weeklySolveTimes.push(statSolveTime);
    else break;
  }

  if (weeklySolveTimes.length === 0) return "N/A";

  let weeklyAvg = computeAverage(weeklySolveTimes);
  return formatTime(weeklyAvg);
}

function computeMonthlyAvg(stats: any): string {
  let monthlySolveTimes: number[] = [];

  for (let i = stats.history.length - 1; i >= 0; i--) {
    let dateOfStat = stats.history[i].date;
    let statSolveTime = stats.history[i].solve_time_value;

    if (isValidTimeframe(dateOfStat, 30)) monthlySolveTimes.push(statSolveTime);
    else break;
  }

  if (monthlySolveTimes.length === 0) return "N/A";

  let monthlyAvg = computeAverage(monthlySolveTimes);
  return formatTime(monthlyAvg);
}

function computeAvgOfPast5(stats: any): string {
  let historyLength = stats.history.length;
  if (historyLength < 5) {
    return "N/A";
  }

  let past5 = stats.history.slice(historyLength - 5, historyLength);
  let solveTimes = past5.map((obj: any): void => obj.solve_time_value);

  let average = computeAverage(solveTimes);
  return formatTime(average);
}

function getBestTime(): string {
  let stats = storage.load("app-stats.json");
  return stats.best_time;
}

function getChartData(): any {
  let stats = storage.load("app-stats.json");
  let validStats = [];

  // Extract stats which fall within past month
  for (let i = stats.history.length - 1; i >= 0; i--) {
    let dateOfStat = stats.history[i].date;
    if (isValidTimeframe(dateOfStat, 30))
      validStats.push({ ...stats.history[i], index: i });
    else break;
  }

  let validStatsMap = new Map();

  // Extract solve times for each valid stat date
  validStats.forEach(validStat => {
    let validTimes = [];
    let statDate = extractDateStr(validStat.date);

    if (validStatsMap.get(statDate)) validTimes = validStatsMap.get(statDate);

    validTimes.push(validStat.solve_time_value);
    validStatsMap.set(statDate, validTimes);
  });

  // Compute averages for each valid stat day
  validStatsMap.forEach((value, key) => {
    if (value.length > 1) validStatsMap.set(key, computeAverage(value) / 1000);
    else validStatsMap.set(key, value[0] / 1000);
  });

  return {
    labels: Array.from(validStatsMap.keys()),
    data: Array.from(validStatsMap.values())
  };
}

export default {
  getAvg,
  getBestTime,
  getChartData
};
