import React from "react";
import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  const deliveryFee = cartItems.length > 0 ? 40 : 0;

  const platformFee = cartItems.length > 0 ? 10 : 0;
  // const clearCart = () => {
  //     setCartItems([]);
  // };
  const grandTotal =
    totalPrice + deliveryFee + platformFee;

  if (cartItems.length === 0) {
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
            Looks like you haven't added anything to your cart yet.
          </p>

          <Link
            to="/restaurants"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Explore Restaurants
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50/40">
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Cart
          </h1>

          <p className="mt-2 text-gray-500">
            Review your items before placing your order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-5 lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={`${item.restaurantId}-${item.id}`}
                className="rounded-2xl bg-white p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-28 w-28 rounded-xl object-cover"
                  />

                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {item.restaurantName}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(
                            item.id,
                            item.restaurantId
                          )
                        }
                        className="text-gray-400 transition hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <p className="font-bold text-gray-900">
                        ₹{item.price * item.quantity}
                      </p>

                      <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-1">
                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item.id,
                              item.restaurantId
                            )
                          }
                          className="rounded-md p-1 text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="w-5 text-center text-sm font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.id,
                              item.restaurantId
                            )
                          }
                          className="rounded-md p-1 text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">
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

              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
            </div>

          <Link
            to="/checkout"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3.5 font-bold text-white transition hover:shadow-lg"
          >
            Proceed to Checkout
          <ArrowRight size={18} />
          </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;