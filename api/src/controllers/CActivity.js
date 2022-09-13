// const axios = require('axios');
const { Country, Activity, CountryActivity } = require('../db');

const postActivity = async function(req, res, next) {

  const { name, difficulty, duration, season, countries } = req.body;
  try {

    const activity = await Activity.create({
      name, difficulty, duration, season
    });

    await activity.addCountry(countries);

    const prueba = await Country.findAll({
      include: {
        model: Activity,
        as: 'Activities'
      }
    });

    const prueba2 = await Activity.findAll({
      include: {
        model: Country
      }
    })
    res.json(prueba2);

  } catch (error) {
    next(error);
  }

}

module.exports = postActivity;