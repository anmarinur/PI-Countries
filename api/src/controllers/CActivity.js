// const axios = require('axios');
const { Country, Activity, CountryActivity } = require('../db');

const postActivity = async function(res, req) {
  const { name, difficult, duration, season } = req.body;

  try {
    if (name) {
      const activity = await Activity.create({
        name, difficult, duration, season
      });
      res.json(activity);
    } else {
      res.json('Datos incompletos');
    }
  } catch (error) {
    console.log('Error: ', error);
  }

}

module.exports = postActivity;