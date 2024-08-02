const axios = require("axios");

const response = axios({
  method: "GET",
  url:
    "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
    "x-rapidapi-key": "KEY"
  }
});

export default response;
