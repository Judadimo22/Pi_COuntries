const express = require ('express');
const {getActivities, createActivity, deleteActivity} = require('../controllers/activityController');
const router = express.Router();

router.post('/', createActivity);
router.get('/', getActivities);
router.post('/delete/:id', deleteActivity)



module.exports = router;