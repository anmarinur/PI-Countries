const axios = require('axios');
const { Country, Activity, CountryActivity } = require('../db');

const getCountry = async (req, res) => {

  try {
    let countries = (await axios.get('https://restcountries.com/v3/all'));
    console.log('start info')
    countries = countries.data.map(p => {
      console.log(p.capital)
      return {
          id: p.cca3,
          name: p.name.common,
          flagImg: p.flags[1],
          continent: p.continents[0],
          capital: p.capital,
          subregion: p.subregion,
          area: p.area,
          population: p.population
      };
    });
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