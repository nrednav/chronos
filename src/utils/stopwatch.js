function Stopwatch() {
  let time = 0,
    interval = 0,
    offset = 0,
    counting = false;

  function update() {
    if (counting) {
      time += delta();
    }
    let formattedTime = formatTime(time);
    document.querySelector(".main__timer-clock").textContent = formattedTime;
  }

  function delta() {
    let now = Date.now();
    let timePassed = now - offset;
    offset = now;

    return timePassed;
  }

  function formatTime(timeMilliseconds) {
    const time = new Date(timeMilliseconds);
    let minutes = time.getMinutes().toString();
    let seconds = time.getSeconds().toString();
    let milliseconds = time.getMilliseconds().toString();

    if (minutes.length < 2) minutes = "0" + minutes;
    if (seconds.length < 2) seconds = "0" + seconds;
    if (milliseconds.length < 3) milliseconds = "0" + milliseconds;

    return `${minutes}:${seconds}.${milliseconds.substr(0, 2)}`;
  }

  this.start = function() {
    if (!counting) {
      interval = setInterval(update, 10);
      offset = Date.now();
      counting = true;
    }
  };

  this.stop = function() {
    if (counting) {
      clearInterval(interval);
      interval = null;
      counting = false;
    }
  };

  this.reset = function() {
    time = 0;
    update();
  };

  this.isRunning = function() {
    return counting;
  };
}

export default Stopwatch;
