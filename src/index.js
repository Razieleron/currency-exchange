import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeApiCall from './js/exchange.js';

// Business Logic

async function getExchangeRate(fish) {
  const response = await ExchangeApiCall.getExchangeRate(fish);
  if (response.result) {
    printElements(response, fish);
  } else {
    printError(response, fish);
  }
}

// UI Logic

function printElements(fish) {
  
  const rate = fish.conversion_rates;
  console.log("fish.conversion_rates =", fish.conversion_rates);
  console.log("rate =", rate);

  // console.log("rate: " rate)
  // const img = document.createElement('img');
  // img.setAttribute('src', fish.data[Math.floor(Math.random() * 24)].images.original.url);
  // img.setAttribute('class', 'gif');
  // document.querySelector('#where-the-api-info-goes').append(img);
  document.querySelector('#where-the-api-info-goes').innerText = Array.from(fish.conversion_rates).join(' ');
}

function printError(error, fish) {
  document.querySelector('#where-the-api-info-goes').innerText = `There was an error getting ${fish}: ${error}`;
}

function userInputForm(event) {
  event.preventDefault();
  let fish = document.querySelector('#user-input').value;
  document.querySelector('#user-input').value = null;
  getExchangeRate(fish);
}

window.addEventListener("load", function() {
  document.querySelector("#user-input-form").addEventListener("submit", userInputForm);
});
