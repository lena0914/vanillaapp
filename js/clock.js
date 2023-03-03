const calendar = document.querySelector(".clock span:first-child");
const clock = document.querySelector(".clock span:last-child");

// utils
const formatTime = (time) => {
  return String(time).padStart(2, "0");
};

const showTime = () => {
  const currentDate = new Date();
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const hour = formatTime(currentDate.getHours());
  const minutes = formatTime(currentDate.getMinutes());
  const seconds = formatTime(currentDate.getSeconds());

  const today = currentDate.toLocaleDateString("en-US", options);
  const now = `${hour}:${minutes}:${seconds}`;

  return {
    today,
    now,
  };
};

const showClock = () => {
  const currentTime = showTime();
  calendar.innerHTML = currentTime.today;
  clock.innerHTML = currentTime.now;
  return showClock;
};

setInterval(showClock(), 1000);
