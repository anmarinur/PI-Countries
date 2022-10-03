const axios = require('axios');
const { Op } = require('sequelize');
const { Country, Activity } = require('../db');

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
            capital: !p.capital ? "This country doesn't have a capital" : p.capital[0],
            subregion: p.subregion,
            area: p.area,
            population: p.population
          }
        });
      });
      const allCountriesFront = await Country.findAll({
        attributes: ['id', 'flagImg', 'name', 'continent', 'population'],
        include: {
          model: Activity,
          attributes: ['name', 'difficulty', 'duration', 'season']
        }
      });
      res.status(200).json(allCountriesFront);
    } catch (error) {
      res.status(400).send('The API is not responding')
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
        res.status(200).json(countryByName);
      } else {
        throw new Error("Couldn't find a country with that name")
      }
      
    } catch (error) {
      res.status(404).json(error.message)
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
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt']
        }
      }
    })
    if (infoCountry.length !== 0) {
      res.status(200).json(infoCountry)
    } else {
      throw new Error("Couldn't find a country with that id")
    }
  } catch (error) {
    res.status(404).json(error.message)
    next(error)
  }
}

module.exports = {
  getCountry,
  getCountryById
};