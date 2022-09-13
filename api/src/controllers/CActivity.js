// const axios = require('axios');
const { Country, Activity, CountryActivity } = require('../db');

const postActivity = async function(req, res, next) {

  const { name, difficulty, duration, season, countries } = req.body;
  try {

    const activity = await Activity.create({
      name, difficulty, duration, season
    });

    await activity.addCountry(countries);
    res.json(activity);

  } catch (error) {
    next(error);
  }

}

module.exports = postActivity;