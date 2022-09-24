const axios = require('axios');
const { Op } = require('sequelize');
const { Country, Activity, CountryActivity } = require('../db');

const getCountry = async (req, res, next) => {
  const { name } = req.query;
  if (!name) {
    try {
      let infoApi = await axios.get('https://restcountries.com/v3/all');
      infoApi.data.map(p => { 
        Country.findOrCreate({
          where: {
            id: p.cca3
          },
          defaults: {
            id: p.cca3,
            name: p.name.common,
            flagImg: p.flags[1],
            continent: p.continents[0],
            capital: !p.capital ? 'No tiene' : p.capital[0],
            subregion: p.subregion,
            area: p.area,
            population: p.population
          }
        });
      });
      const allCountriesFront = await Country.findAll({
        attributes: ['id', 'flagImg', 'name', 'continent', 'population']
      });
      res.json(allCountriesFront);
            
      } catch (error) {
        next(error);
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
      });
      if (countryByName.length !== 0) {
        res.json(countryByName);
      } else {
        res.json('País no encontrado')
      }
      
    } catch (error) {
      next(error);
    }
  }
}


const getCountryById = async function (req, res, next) {
  const {idPais} = req.params;

  try {
    const infoCountry = await Country.findAll({
      where: {
        id: idPais
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'] 
      },
      include: {
        model: Activity,
      }
    })
    if (infoCountry.length === 0) {
      res.json('País no encontrado')
    }
    res.json(infoCountry)
  } catch (error) {
    next(error)
  }
  
}

module.exports = {
  getCountry,
  getCountryById
};