import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeApiCall from './js/exchange.js';

// Business Logic
async function getExchangeRate(destinationCurrency) {
  const response = await ExchangeApiCall.getExchangeRate(destinationCurrency);
  if (response.result) {
    printElements(response, destinationCurrency);
  } else {
    printError(response, destinationCurrency);
  }
}

// UI Logic
function printElements(destinationCurrency) {
  const conversionRate = destinationCurrency.conversion_rate;
  console.log(conversionRate, " = Conversion Rate")
  let amount = document.querySelector('#starting_value').value;
  let currency = document.querySelector('#destination_currency').value;
  let result = document.querySelector('#where-the-api-info-goes');
  result.innerText = `${amount} of USD is equivalent to ${amount * conversionRate} of ${currency}`
}

function printError(error, fish) {
  document.querySelector('#where-the-api-info-goes').innerText = `There was an error getting ${fish}: ${error}`;
}

function userInputForm(event) {
  event.preventDefault();
  document.querySelector('#where-the-api-info-goes').innerText = ""
  let amount = document.querySelector('#starting_value').value;
  console.log(amount)
  let currency = document.querySelector('#destination_currency').value;
  getExchangeRate(currency);
}

window.addEventListener("load", function() {
  document.querySelector("#user-input-form").addEventListener("submit", userInputForm)
});