const Restaurant = require('../models/Restaurants');

// @desc    get all restaurants
// @route   GET /api/v1/restaurants
// @access  Public

exports.getRestaurants = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find();

        return res.status(200).json({
            success: true,
            count: restaurants.length,
            data: restaurants
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({error : 'Server error'});
    }
};


// @desc    create a restaurant
// @route   POST /api/v1/restaurants
// @access  Public

exports.addRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.create(req.body);

        return res.status(200).json({
            success: true,
            data: restaurant
        });
    } catch(err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'This store already exists' });
        }
        res.status(500).json({error : 'Server error'});
    }
};