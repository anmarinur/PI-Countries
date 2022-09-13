// const axios = require('axios');
const { Country, Activity, CountryActivity } = require('../db');

const postActivity = async function(req, res, next) {
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    if (name) {
      const activity = await Activity.create({
        name, difficulty, duration, season, countries
      });
      const actividad = await Activity.findByPk('6295abb0-3311-11ed-ac12-610771885821');
      await actividad.addCountry(countries)
      
      console.log(actividad);
      res.json(actividad);
    } else {
      res.json('Datos incompletos');
    }
  } catch (error) {
    next(error);
  }

}

module.exports = postActivity;