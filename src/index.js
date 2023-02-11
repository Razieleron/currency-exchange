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
  const conversionRate = fish.conversion_rates;
  let amount = document.querySelector('#starting_value').value;
  let currency = document.querySelector('#destination_currency').value;
  let result = document.querySelector('#where-the-api-info-goes');
  
  
  if(conversionRate){
    for(const[key, value] of Object.entries(conversionRate)){
      if (key === currency)
      result.append(`${amount} ${key} = ${value*amount} ${currency} <br>` );
      result.append(`1 USD = ${value} ${key} `);
    }
  }
  // const destination_currency = document.querySelector('#destination_currency').value;
  // const exchangeRate = conversionRate.destination_currency;
  // console.log("exchangeRate =", exchangeRate)
  // console.log("fullApiReturn =", fullApiReturn)
  // // console.log("fish.conversion_rates.usd =", fish.conversion_rates["usd"]);
  // console.log("fish.conversion_rates[0] =", fish.conversion_rates);
  // console.log("rate =", exchangeRate);


  // console.log("rate: " rate)
  // const img = document.createElement('img');
  // img.setAttribute('src', fish.data[Math.floor(Math.random() * 24)].images.original.url);
  // img.setAttribute('class', 'gif');
  // document.querySelector('#where-the-api-info-goes').append(img);
  // document.querySelector('#where-the-api-info-goes').innerText = destination_currency + exchangeRate + fish;
}

function printError(error, fish) {
  document.querySelector('#where-the-api-info-goes').innerText = `There was an error getting ${fish}: ${error}`;
}

function userInputForm(event) {
  event.preventDefault();
  let currency = document.querySelector('#starting_currency').value;
  document.querySelector('#starting_currency').value = null;
  document.querySelector('#starting_value').value = null;
  document.querySelector('#destination_currency').value = null;
  getExchangeRate(currency);
}

window.addEventListener("load", function() {
  document.querySelector("#user-input-form").addEventListener("submit", userInputForm);
});
