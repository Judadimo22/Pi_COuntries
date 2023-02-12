const express = require('express');
const router = express.Router();
const {getCountryByName, getCountryById} = require('../controllers/countryController')

router.get('/', getCountryByName);
router.get('/:id', getCountryById);

module.exports = router;