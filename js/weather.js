const handleSuccess = (pos) => {
  console.log(pos);
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  const API_KEY = "af7c3624f5e0dfa6d69801b45a75f990"; // used only for free API calls
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const getWeatherData = async () => {
    const response = await (await fetch(weatherUrl)).json();
    return response;
  };

  getWeatherData().then((res) => {
    const temperature = Math.round(res.main.temp);
    const { description, icon } = res.weather[0];
    const region = res.name;

    const weather = document.querySelector(".weather");
    const weatherIcon = document.createElement("img");
    weatherIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;
    weatherIcon.alt = description;
    const weatherInfo = document.createElement("span");
    weatherInfo.innerText = `${temperature}°C in ${region}`;
    weather.appendChild(weatherIcon);
    weather.appendChild(weatherInfo);
  });
};

const handleFailure = (err) => {
  console.log("[ERROR]");
  console.log(err);
};

navigator.geolocation.getCurrentPosition(handleSuccess, handleFailure);
