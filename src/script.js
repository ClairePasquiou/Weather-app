function updateClock() {
  let now = new Date();
  let h5 = document.querySelector("h5");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  h5.innerHTML = `${day} ${hours}:${minutes}`;
}

updateClock();

/// Display searching city and temperature

function cityName(event) {
  event.preventDefault();
  let cityDisplay = document.querySelector("#city-search");
  let currentCity = document.querySelector("#city");
  if (cityDisplay.value.length > 0) {
    currentCity.innerHTML = cityDisplay.value;
    let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
    let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityDisplay.value}&units=metric&appid=${apiKey}`;
    axios.get(urlWeather).then(locationWeather);
  } else {
    alert("Please type in a city name ☺️");
  }
}

function locationWeather(response) {
  let currentSearchTemp = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  currentSearchTemp.innerHTML = `${temperature}`;
}

let city = document.querySelector("#search-form");
city.addEventListener("submit", cityName);

//current Geolocation

function findPosition(position) {
  let apiKey = "362a04f0970924cd6a5416ed3fd8f380";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(urlWeather).then(showWeather);
}

function showWeather(response) {
  let todayWeather = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  todayWeather.innerHTML = `${temperature}`;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;
}

function getcurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findPosition);
}

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getcurrentLocation);
