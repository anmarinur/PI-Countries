// const axios = require('axios');
const { Country, Activity, CountryActivity } = require('../db');

const postActivity = async function(res, req, next) {
  const { name, difficulty, duration, season } = req.body;

  try {
    if (name) {
      const activity = await Activity.create({
        name, difficulty, duration, season
      });
      res.json(activity);
    } else {
      res.json('Datos incompletos');
    }
  } catch (error) {
    next(error);
  }

}

module.exports = postActivity;