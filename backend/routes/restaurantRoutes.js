const express = require("express");

const {
  getRestaurants,
  getRestaurantById,
} = require("../controllers/restaurantController");

const router = express.Router();

// GET all restaurants
router.get("/", getRestaurants);

// GET single restaurant
router.get("/:id", getRestaurantById);

module.exports = router;