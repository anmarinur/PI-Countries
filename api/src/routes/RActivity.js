const { Router } = require('express');
const router = Router();

const { postActivity, getActivities } = require('../controllers/CActivity');

router.post('/', postActivity)
router.get('/', getActivities)

module.exports = router;