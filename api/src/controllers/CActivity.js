const { Country, Activity } = require('../db');

const postActivity = async function(req, res, next) {
  const { name, difficulty, duration, season, countries } = req.body;
  try {
    const activity = await Activity.create({
      name, difficulty, duration, season
    });
    await activity.addCountry(countries);
    res.status(200).json(activity);
  } catch (error) {
    res.status(400).send("Error, the activity wasn't created")
  }
}

const getActivities = async function(req, res, next) {
  try {
    const activities = await Activity.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: {
        model: Country
      }
    })
    res.status(200).json(activities);
  } catch (error) {
    res.status(404).send("Error getting activities")
  }
}

module.exports = { postActivity, getActivities };