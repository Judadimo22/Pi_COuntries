const express = require ('express');
const {getActivities, createActivity} = require('../controllers/activityController');
const router = express.Router();

router.post('/', createActivity);
router.get('/', getActivities);



module.exports = router;