const axios = require('axios');
const { Country, Activity, CountryActivity } = require('../db');

const getCountry = async (req, res) => {

  try {
    let infoApi = await axios.get('https://restcountries.com/v3/all');
    let infoData = await infoApi.data.map(p => {
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
    res.json(infoData);
  } catch (error) {
    res.send(error)
  }
}

const getCountryById = async function (req, res) {
  const {idPais} = req.params;
  console.log(idPais)
 
}

module.exports = {
  getCountry,
  getCountryById
};