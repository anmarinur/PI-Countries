// const axios = require('axios');
const { Country, Activity, CountryActivity } = require('../db');

const postActivity = async function(req, res, next) {

  const { name, difficulty, duration, season, countries } = req.body;
  try {

    const activity = await Activity.create({
      name, difficulty, duration, season
    });

    await activity.addCountry(countries);

    // const prueba = await Country.findAll({
    //   include: {
    //     model: Activity,
    //     as: 'Activities'
    //   }
    // });

    // const prueba2 = await Activity.findAll({
    //   include: {
    //     model: Country
    //   }
    // })
    res.json(activity);

  } catch (error) {
    next(error);
  }

}

const getActivities = async function(req, res, next) {
  try {
    const activities = await Activity.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
    res.json(activities)
  } catch (error) {
    next(error)
  }
}

module.exports = { postActivity, getActivities };