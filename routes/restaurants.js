const express = require('express');
const { getRestaurants, addRestaurant } = require('../controllers/restaurants');

const router = express.Router();

router.route('/').get(getRestaurants).post(addRestaurant);

module.exports = router;