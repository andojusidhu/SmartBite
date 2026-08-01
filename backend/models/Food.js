const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    cuisine: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    isVeg: {
      type: Boolean,
      default: false,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    rating: {
      type: Number,
      default: 4.0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Food",
  foodSchema
);