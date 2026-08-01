const express = require("express");

const {
  getFoods,
  getFoodsByRestaurant,
  getFoodById,
  createFood,
} = require("../controllers/foodController");

const router = express.Router();

// Get all foods
router.get("/", getFoods);

// Get foods by restaurant
router.get(
  "/restaurant/:restaurantId",
  getFoodsByRestaurant
);

// Get single food
router.get("/:id", getFoodById);

// Create food
router.post("/", createFood);

module.exports = router;