export default class ExchangeApiCall {  
  static async getExchangeRate(destinationCurrency) {
    try {
      const response = await fetch(
        // `https://v6.exchangerate-api.com/v6/1df9f5beb1af980a84d65377/latest/${fish}`);
        `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${destinationCurrency}`);

      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      // console.log(jsonifiedResponse);
      return jsonifiedResponse;
    
    } catch(error) {
      return error;
    }
  }
}