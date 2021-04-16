function formatTime(minutes, seconds) {
  let min = minutes;
  let sec = seconds;
  if (sec < 10) {
    sec = `0${seconds}`;
  }
  if (min < 10) {
    min = `0${minutes}`;
  }
  return `${min}:${sec}`;
}

export { formatTime };
