import {BASE_URL} from './GlobalConstant';
export class GlobalMethod {
  static async externalCommunication(url, token, method, body) {
    var status = '';
    fetch(`${BASE_URL}${url}`, {
      method: method.toUpperCase(), // *GET, POST, PUT, DELETE, etc.
      body: method.toUpperCase() == 'POST' ? JSON.stringify(body) : null,
      headers: {
        credentials: 'include',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log(response);
        status = response.status;
        return response.json();
      })
      .then(json => {
        return {result: json.results, statusCode: status, isError: false};
      })
      .catch(error => {
        return {
          status,
          result: 'failed to process this request Please try again later',
          isError: true,
        };
      });
  }

  static calculateTax(amount, tax) {
    const taxAmount = amount - (amount * 100) / (tax + 100);
    return taxAmount;
  }

  static twoDecimalWithoutRounding = n => {
    try {
      return parseFloat(n.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
    } catch (e) {
      return 0;
    }
  };

  static formatCurrency(n) {
    try {
      return n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } catch (e) {
      return '0.0';
    }
  }

  static getCurrentDateTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const timeZoneOffset = -currentDate.getTimezoneOffset(); // Get time zone offset in minutes
    const timeZoneOffsetHours = Math.floor(timeZoneOffset / 60); // Convert to hours
    const timeZoneOffsetMinutes = Math.abs(timeZoneOffset) % 60; // Get remaining minutes

    // Format the time zone offset string (+/-HH:MM)
    const timeZoneOffsetString =
      (timeZoneOffset >= 0 ? '+' : '-') +
      String(Math.abs(timeZoneOffsetHours)).padStart(2, '0') +
      ':' +
      String(timeZoneOffsetMinutes).padStart(2, '0');

    // Construct the date-time string in the desired format
    const dateTimeString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timeZoneOffsetString}`;

    return dateTimeString;
  };
}
