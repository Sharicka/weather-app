let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let day = days[now.getDay()];

let currentDay = document.querySelector("#date-time");
currentDay.innerHTML = `${day} ${hours}: ${minutes}`;

function localSearch(city) {
  let apiKey = `343ec7763db033ffad6d357c813c9941`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector(`#city-input`).value;

  localSearch(city);
}

let kingston = document.querySelector(`#current-city`);
let cityInput = document.querySelector("#city-input");
kingston.innerHTML = cityInput.value;

let form = document.querySelector(`#search-form`);
form.addEventListener(`submit`, search);

function showTemperature(response) {
  document.querySelector(`#current-city`).innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector(`#temperature-description`).innerHTML =
    response.data.weather[0].main;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}

let position = document.querySelector("#search-form");
position.addEventListener(`submit`, localSearch);
console.log(position);

function searchCurrentLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = `343ec7763db033ffad6d357c813c9941`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

navigator.geolocation.getCurrentPosition(searchCurrentLocation);
let currentLocationButton = document.querySelector(`#current-location-button`);
currentLocationButton.addEventListener(`click`, handleLocation);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(`#temperature`);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(`#temperature`);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector(`#fahrenheit-link`);
fahrenheitLink.addEventListener(`click`, convertToFahrenheit);

let celsiusLink = document.querySelector(`#celsius-link`);
celsiusLink.addEventListener(`click`, convertToCelsius);

localSearch("Kingston");
