// Display a default city when refreshing
function search(city) {
  let apiKey = "669df815a230d0606e20716b21beda24";
  let unit = "imperial";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiURL).then(showWeather);
}

// Display searched city name, temp, and info
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;

  search(cityInput);
}

// Display weather of city searched
function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#precipitation").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;

  fahrenheitTemp = response.data.main.temp;
}

// Display name, temp, and info of current location
function searchLocation(position) {
  let apiKey = "669df815a230d0606e20716b21beda24";
  let unit = "imperial";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;

  axios.get(apiURL).then(showWeather);
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentCity);

// Display current date and time
function currentTime() {
  let time = new Date();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentMonth = months[time.getMonth()];
  let currentDate = time.getDate();
  let currentYear = time.getFullYear();
  let currentHour = time.getHours();
  let currentMinutes = time.getMinutes();

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentMonth} ${currentDate}, ${currentYear} | ${currentHour}:${currentMinutes}`;
}

let timeShown = document.querySelector("#current-time");
timeShown.innerHTML = currentTime();

let fahrenheitTemp = null;

// Link to convert between celsius and fahrenheit
function toCelsius(event) {
  event.preventDefault();
  let degreesC = Math.round(((fahrenheitTemp - 32) * 5) / 9);

  tempFahrenheit.classList.remove("active");
  tempCelsius.classList.add("active");

  let tempDisplayed = document.querySelector("#current-temp");
  tempDisplayed.innerHTML = degreesC;
}

function toFahrenheit(event) {
  event.preventDefault();

  tempFahrenheit.classList.add("active");
  tempCelsius.classList.remove("active");

  let tempDisplayed = document.querySelector("#current-temp");
  tempDisplayed.innerHTML = Math.round(fahrenheitTemp);
}

let tempCelsius = document.querySelector("#to-celsius");
let tempFahrenheit = document.querySelector("#to-fahrenheit");
tempCelsius.addEventListener("click", toCelsius);
tempFahrenheit.addEventListener("click", toFahrenheit);

search("Tel Aviv");
