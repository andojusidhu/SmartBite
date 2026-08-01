import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, ShoppingBag } from "lucide-react";
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
    totalPrice +
    deliveryFee +
    platformFee;

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const orderData = {
        items: cartItems.map((item) => ({
          food: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          restaurant: item.restaurantId,
          restaurantName:
            item.restaurantName,
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

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to place order"
        );
      }

      // Clear cart
      clearCart();

      // Go to orders page
      navigate("/orders");

    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-orange-50/40 px-4">

        <div className="text-center">

          <ShoppingBag
            size={50}
            className="mx-auto text-orange-500"
          />

          <h1 className="mt-5 text-2xl font-bold">
            Your cart is empty
          </h1>

          <button
            onClick={() =>
              navigate("/restaurants")
            }
            className="mt-5 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white"
          >
            Explore Restaurants
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50/40">

      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">

        <h1 className="text-3xl font-bold text-gray-900">
          Checkout
        </h1>

        <p className="mt-2 text-gray-500">
          Enter your delivery details and place
          your order.
        </p>


        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}


        <form
          onSubmit={handlePlaceOrder}
          className="mt-8 grid gap-8 lg:grid-cols-3"
        >

          {/* Left Side */}
          <div className="space-y-6 lg:col-span-2">

            {/* Delivery Address */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-orange-100 p-2 text-orange-500">
                  <MapPin size={20} />
                </div>

                <h2 className="text-xl font-bold">
                  Delivery Address
                </h2>

              </div>


              <div className="mt-6 grid gap-4 md:grid-cols-2">

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
                />

                <textarea
                  name="address"
                  placeholder="Full Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500 md:col-span-2"
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
                />

              </div>

            </div>


            {/* Payment */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-orange-100 p-2 text-orange-500">
                  <CreditCard size={20} />
                </div>

                <h2 className="text-xl font-bold">
                  Payment Method
                </h2>

              </div>


              <div className="mt-6 space-y-3">

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 hover:border-orange-500">

                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={
                      paymentMethod === "COD"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <div>
                    <p className="font-semibold">
                      Cash on Delivery
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay when your order arrives
                    </p>
                  </div>

                </label>


                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 hover:border-orange-500">

                  <input
                    type="radio"
                    name="payment"
                    value="ONLINE"
                    checked={
                      paymentMethod ===
                      "ONLINE"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <div>
                    <p className="font-semibold">
                      Online Payment
                    </p>

                    <p className="text-sm text-gray-500">
                      Payment integration can be
                      added later
                    </p>
                  </div>

                </label>

              </div>

            </div>

          </div>


          {/* Order Summary */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Order Summary
            </h2>


            <div className="mt-6 space-y-4">

              {cartItems.map((item) => (

                <div
                  key={`${item.restaurantId}-${item.id}`}
                  className="flex justify-between gap-4 text-sm"
                >

                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="text-gray-500">
                      {item.quantity} × ₹
                      {item.price}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹
                    {item.price *
                      item.quantity}
                  </p>

                </div>

              ))}


              <div className="border-t border-gray-100 pt-4">

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Item Total</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="mt-3 flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>

                <div className="mt-3 flex justify-between text-sm text-gray-600">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>

                <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 text-lg font-bold">
                  <span>Total</span>
                  <span>
                    ₹{grandTotal}
                  </span>
                </div>

              </div>

            </div>


            <button
              type="submit"
              disabled={loading}
              className="mt-7 w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3.5 font-bold text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Placing Order..."
                : `Place Order • ₹${grandTotal}`}
            </button>

          </div>

        </form>

      </main>

    </div>
  );
};

export default Checkout;