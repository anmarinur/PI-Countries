// const axios = require('axios');
const { Country, Activity, CountryActivity } = require('../db');

const getCountry = async function (req, res) {
  res.json({mensaje: 'hola'});
}

const getCountryById = async function (req, res) {

}

module.exports = {
  getCountry,
  getCountryById
};