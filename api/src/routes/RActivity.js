const { Router } = require('express');
const router = Router();

const postActivity = require('../controllers/CActivity');

router.post('/', postActivity)

module.exports = router;