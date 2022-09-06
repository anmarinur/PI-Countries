const { Router } = require('express');
const router = Router();

const { getCountry, getCountryById } = require('../controllers/CCountries')

router.get('/', getCountry);
router.get('/:idPais', getCountryById);

module.exports = router;