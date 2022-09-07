const axios = require('axios');
const { Country, Activity, CountryActivity } = require('../db');

async function getCountry (req, res) {

  try {
    console.log('flag')
    let countries = (await axios.get('https://restcountries.com/v3/all')).data;
    res.json(countries);
  } catch (error) {
    res.send(error)
  }
}

const getCountryById = async function (req, res) {

}

module.exports = {
  getCountry,
  getCountryById
};