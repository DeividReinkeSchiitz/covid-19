const axios = require("axios");

const response = axios({
  method: "GET",
  url:
    "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
    "x-rapidapi-key": "9fa81f803amshe5bd3628b190ceep12b1c1jsn6e9933a9f010"
  }
});

export default response;
