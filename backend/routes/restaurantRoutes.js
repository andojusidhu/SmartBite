const express = require("express");

const {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
} = require("../controllers/restaurantController");

const router = express.Router();

// Get all restaurants
router.get("/", getRestaurants);

// Get single restaurant
router.get("/:id", getRestaurantById);

// Create restaurant
router.post("/", createRestaurant);

module.exports = router;