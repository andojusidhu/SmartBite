const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },

  name: String,
  image: String,

  price: Number,

  quantity: Number,

  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },

  restaurantName: String,
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [orderItemSchema],

    deliveryAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },

    itemTotal: Number,

    deliveryFee: Number,

    platformFee: Number,

    totalAmount: Number,

    status: {
      type: String,
      enum: [
        "Pending",
        "Preparing",
        "Out for Delivery",
        "Delivered",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);