const Restaurant = require("../models/Restaurant");

// Get all restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.error("Get Restaurants Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurants",
    });
  }
};


// Get single restaurant
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(
      req.params.id
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.error(
      "Get Restaurant Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurant",
    });
  }
};


// Create restaurant
const createRestaurant = async (req, res) => {
  try {
    const {
      name,
      image,
      cuisine,
      rating,
      deliveryTime,
      deliveryFee,
      location,
      isOpen,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !image ||
      !cuisine ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, image, cuisine and location are required",
      });
    }

    const restaurant =
      await Restaurant.create({
        name,
        image,
        cuisine,
        rating,
        deliveryTime,
        deliveryFee,
        location,
        isOpen,
      });

    res.status(201).json({
      success: true,
      message:
        "Restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    console.error(
      "Create Restaurant Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create restaurant",
    });
  }
};


module.exports = {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
};