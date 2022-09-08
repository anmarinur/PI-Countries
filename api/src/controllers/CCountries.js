const axios = require('axios');
const { Country, Activity, CountryActivity } = require('../db');

const getCountry = async (req, res) => {

  try {
    let infoApi = await axios.get('https://restcountries.com/v3/all');
    let infoData = await infoApi.data.map(p => { 
      return {
          id: p.cca3,
          name: p.name.common,
          flagImg: p.flags[1],
          continent: p.continents[0],
          capital: !p.capital ? 'no tiene' : p.capital[0],
          subregion: p.subregion,
          area: p.area,
          population: p.population
      };
    });
    await Country.bulkCreate(infoData);
    const result = await Country.findAll({
      attributes: ['flagImg', 'name', 'continent']
    });
    res.json(result);
    
  } catch (error) {
    res.send(error);
  }
}

const getCountryById = async function (req, res) {
  const {idPais} = req.params;
  console.log(idPais);
  
}

module.exports = {
  getCountry,
  getCountryById
};