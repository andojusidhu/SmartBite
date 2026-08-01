const Food = require("../models/Food");
const Restaurant = require("../models/Restaurant");

// Get all food items
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find()
      .populate("restaurant", "name image location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foods.length,
      foods,
    });
  } catch (error) {
    console.error("Get Foods Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch food items",
    });
  }
};


// Get food items by restaurant
const getFoodsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(
      restaurantId
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const foods = await Food.find({
      restaurant: restaurantId,
      isAvailable: true,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      restaurant,
      count: foods.length,
      foods,
    });
  } catch (error) {
    console.error(
      "Get Restaurant Foods Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurant foods",
    });
  }
};


// Get single food item
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(
      req.params.id
    ).populate(
      "restaurant",
      "name image location"
    );

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    console.error(
      "Get Food Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch food item",
    });
  }
};


// Create food item
const createFood = async (req, res) => {
  try {
    const {
      restaurant,
      name,
      description,
      image,
      price,
      category,
      cuisine,
      tags,
      isVeg,
      isAvailable,
      rating,
    } = req.body;

    // Validate required fields
    if (
      !restaurant ||
      !name ||
      !image ||
      !price ||
      !category ||
      !cuisine
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Restaurant, name, image, price, category and cuisine are required",
      });
    }

    // Check restaurant
    const restaurantExists =
      await Restaurant.findById(
        restaurant
      );

    if (!restaurantExists) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const food = await Food.create({
      restaurant,
      name,
      description,
      image,
      price,
      category,
      cuisine,
      tags,
      isVeg,
      isAvailable,
      rating,
    });

    res.status(201).json({
      success: true,
      message:
        "Food item created successfully",
      food,
    });
  } catch (error) {
    console.error(
      "Create Food Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create food item",
    });
  }
};


module.exports = {
  getFoods,
  getFoodsByRestaurant,
  getFoodById,
  createFood,
};