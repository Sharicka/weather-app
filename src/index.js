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

function search(event) {
  event.preventDefault();
  let searchCity = document.querySelector(`#city-input`);
  let city = document.querySelector(`#current-city`);
  city.innerHTML = `${searchCity.value}`;
}

let form = document.querySelector(`#search-form`);
form.addEventListener(`submit`, search);

function showTemperature(response) {
  console.log(response.data);
  document.querySelector(`#current-city`).innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(`#temperature-description`).innerHTML =
    response.data.weather[0].main;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

let position = document.querySelector("#search-form");
position.addEventListener(`submit`, showPosition);
console.log(position);

function showPosition() {
  let city = document.querySelector(`#city-input`);
  let currentCity = city.value;
  let h1 = document.querySelector(`h1`);
  h1.innerHTML = currentCity;
  let apiKey = `343ec7763db033ffad6d357c813c9941`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function searchCurrentLocation(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
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
  temperatureElement.innerHTML = 82;
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(`#temperature`);
  temperatureElement.innerHTML = 28;
}

let fahrenheitLink = document.querySelector(`#fahrenheit-link`);
fahrenheitLink.addEventListener(`click`, convertToFahrenheit);

let celciusLink = document.querySelector(`#celcius-link`);
celciusLink.addEventListener(`click`, convertToCelcius);
