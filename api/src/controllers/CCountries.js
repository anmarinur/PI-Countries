const axios = require('axios');
const { Op } = require('sequelize');
const { Country, Activity, CountryActivity } = require('../db');

const getCountry = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    try {
      let infoApi = await axios.get('https://restcountries.com/v3/all');
      let infoData = await infoApi.data.map(p => { 
        return {
            id: p.cca3,
            name: p.name.common,
            flagImg: p.flags[1],
            continent: p.continents[0],
            capital: !p.capital ? 'No tiene' : p.capital[0],
            subregion: p.subregion,
            area: p.area,
            population: p.population
        };
      });
      await Country.bulkCreate(infoData);
      const allCountriesFront = await Country.findAll({
        attributes: ['flagImg', 'name', 'continent']
      });
      res.json(allCountriesFront);
  
    } catch (error) {
      res.send(error);
    }
  } else {
    try {
      const countryByName = await Country.findAll({
        where: {
          name: {
            [Op.iLike] : `%${name}%`
          }
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
      if (countryByName.length !== 0) {
        res.json(countryByName);
      } else {
        res.json('País no encontrado')
      }
      
    } catch (error) {
      console.log(error)
    }
  }
}

const getCountryById = async function (req, res) {
  const {idPais} = req.params;

  try {
    const infoCountry = await Country.findAll({
      where: {
        id: idPais
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'] 
      }
    })
    if (infoCountry.length === 0) {
      res.json('País no encontrado')
    }
    res.json(infoCountry)
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = {
  getCountry,
  getCountryById
};