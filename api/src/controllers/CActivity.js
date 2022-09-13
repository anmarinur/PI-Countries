// const axios = require('axios');
const { Country, Activity, CountryActivity } = require('../db');

const postActivity = async function(req, res, next) {
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    if (name) {
      const activity = await Activity.create({
        name, difficulty, duration, season
      });
      Activity.addCountry(countries);
      res.json(activity);
    } else {
      res.json('Datos incompletos');
    }
  } catch (error) {
    next(error);
  }

}

module.exports = postActivity;