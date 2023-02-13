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
  let amount = document.querySelector('#starting_value').value;
  let currency = document.querySelector('#destination_currency').value;
  let result = document.querySelector('#where-the-api-info-goes');
  if (destinationCurrency) {
    const conversionRate = destinationCurrency.conversion_rate;
    result.innerText = `${amount} of USD is equivalent to ${amount * conversionRate} of ${currency}`;
  } else {
    let result = document.querySelector('#where-the-api-info-goes');
    result.innerText = "That Currency Does Not Exist";
  }
}

function printError(error, destinationCurrency) {
  document.querySelector('#where-the-api-info-goes').innerText = `There was an error getting ${destinationCurrency} : ${error}`;
}

function userInputForm(event) {
  event.preventDefault();
  document.querySelector('#where-the-api-info-goes').innerText = "";
  let currency = document.querySelector('#destination_currency').value;
  getExchangeRate(currency);
}

window.addEventListener("load", function() {
  document.querySelector("#user-input-form").addEventListener("submit", userInputForm);
});