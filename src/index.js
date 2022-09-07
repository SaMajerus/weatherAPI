import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic 

function getWeather(cityName, stateCode, country) {
  let request = new XMLHttpRequest();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode},${country}&appid=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, cityName, stateCode);
    } else {
      printError(this, cityName, stateCode);
    }
  });
  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printError(request, cityName) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${cityName}: ${request.status} ${request.statusText}`;
}

function printElements(apiResponse, cityName) {
  document.querySelector('#showResponse').innerText = `The humidity in ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}, is ${apiResponse.main.humidity}%.
  The temperature in Fahrenheit is ${1.8 * (apiResponse.main.temp - 273) + 32} degrees.
  The wind is ${apiResponse.wind.speed} mph`;
}

function handleFormSubmission(event) {
  event.preventDefault();

  let input = document.getElementById('cityName').value;
  input.toLowerCase();

  // let stateCode = document.getElementById('stateCode').value;
  /*let countryCode = document.getElementById('countryCode').value;*/

  getWeather(input);

  document.querySelector('form').reset();
}

window.addEventListener("load", function(){
  let form = document.querySelector('form');
  form.addEventListener("submit", handleFormSubmission);
})