import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  Banknote,
  ArrowLeft,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    totalPrice,
    clearCart,
  } = useCart();

  const deliveryFee = cartItems.length > 0 ? 40 : 0;
  const platformFee = cartItems.length > 0 ? 10 : 0;

  const grandTotal =
    totalPrice + deliveryFee + platformFee;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // =========================
  // Handle Input
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Place Order
  // =========================

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login before placing an order.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      setError("Please fill all delivery details.");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        items: cartItems.map((item) => ({
          food: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          restaurant: item.restaurantId,
          restaurantName: item.restaurantName,
        })),

        deliveryAddress: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
        },

        paymentMethod,

        itemTotal: totalPrice,

        deliveryFee,

        platformFee,

        totalAmount: grandTotal,
      };

      console.log("Order Data:", orderData);

      const response = await fetch(
        "https://smartbite-backend-ctwv.onrender.com/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      console.log("Place Order Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to place order"
        );
      }

      // Clear cart after successful order
      clearCart();

      setSuccess(true);

      // Navigate to Orders page
      setTimeout(() => {
        navigate("/orders");
      }, 1500);
    } catch (error) {
      console.error("Place Order Error:", error);

      setError(
        error.message ||
          "Something went wrong while placing your order."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Empty Cart
  // =========================

  if (cartItems.length === 0 && !success) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-orange-50/40 px-4">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-500">
            <ShoppingBag size={36} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-2 text-gray-500">
            Add some delicious food before checking out.
          </p>

          <Link
            to="/restaurants"
            className="mt-6 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Explore Restaurants
          </Link>
        </div>
      </div>
    );
  }

  // =========================
  // Success
  // =========================

  if (success) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-orange-50/40 px-4">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle size={40} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Order Placed Successfully!
          </h1>

          <p className="mt-2 text-gray-500">
            Your delicious food is on the way.
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // Checkout Page
  // =========================

  return (
    <div className="min-h-screen bg-orange-50/40">
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">

        {/* Header */}

        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft size={18} />
            Back to Cart
          </Link>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your delivery details and place your order.
          </p>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Left Side */}

            <div className="space-y-6 lg:col-span-2">

              {/* Delivery Address */}

              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                    <MapPin size={22} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Delivery Address
                    </h2>

                    <p className="text-sm text-gray-500">
                      Where should we deliver your food?
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  {/* Name */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  {/* Phone */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  {/* Address */}

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Complete Address
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House number, street, landmark..."
                      rows="3"
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  {/* City */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  {/* Pincode */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Pincode
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Enter pincode"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                </div>
              </div>

              {/* Payment Method */}

              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                    <CreditCard size={22} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Payment Method
                    </h2>

                    <p className="text-sm text-gray-500">
                      Choose how you want to pay.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">

                  {/* COD */}

                  <button
                    type="button"
                    onClick={() =>
                      setPaymentMethod("COD")
                    }
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                      paymentMethod === "COD"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <Banknote
                      size={24}
                      className="text-green-600"
                    />

                    <div className="flex-1">
                      <p className="font-bold text-gray-900">
                        Cash on Delivery
                      </p>

                      <p className="text-sm text-gray-500">
                        Pay when your order arrives.
                      </p>
                    </div>

                    <div
                      className={`h-5 w-5 rounded-full border-2 ${
                        paymentMethod === "COD"
                          ? "border-orange-500 bg-orange-500"
                          : "border-gray-300"
                      }`}
                    />
                  </button>

                  {/* Online */}

                  <button
                    type="button"
                    onClick={() =>
                      setPaymentMethod("ONLINE")
                    }
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                      paymentMethod === "ONLINE"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <CreditCard
                      size={24}
                      className="text-blue-600"
                    />

                    <div className="flex-1">
                      <p className="font-bold text-gray-900">
                        Online Payment
                      </p>

                      <p className="text-sm text-gray-500">
                        Pay securely online.
                      </p>
                    </div>

                    <div
                      className={`h-5 w-5 rounded-full border-2 ${
                        paymentMethod === "ONLINE"
                          ? "border-orange-500 bg-orange-500"
                          : "border-gray-300"
                      }`}
                    />
                  </button>

                </div>
              </div>
            </div>

            {/* Right Side */}

            <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              {/* Items */}

              <div className="mt-6 space-y-4">

                {cartItems.map((item) => (
                  <div
                    key={`${item.restaurantId}-${item.id}`}
                    className="flex gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />

                    <div className="flex flex-1 justify-between gap-3">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {item.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-gray-900">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}

              </div>

              {/* Price Details */}

              <div className="mt-6 space-y-4 border-t border-gray-100 pt-6">

                <div className="flex justify-between text-gray-600">
                  <span>Item Total</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-4 text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>

              </div>

              {/* Place Order */}

              <button
                type="submit"
                disabled={loading}
                className="mt-7 w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-4 font-bold text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Placing Order..."
                  : `Place Order • ₹${grandTotal}`}
              </button>

              <p className="mt-4 text-center text-xs text-gray-400">
                By placing your order, you agree to our
                terms and conditions.
              </p>

            </div>

          </div>
        </form>
      </main>
    </div>
  );
};

export default Checkout;