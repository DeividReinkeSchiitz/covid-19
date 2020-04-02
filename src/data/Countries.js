const axios = require("axios");

const countries = axios.get("https://api.printful.com/countries");

module.exports = countries;
