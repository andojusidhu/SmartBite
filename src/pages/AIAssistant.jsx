import React, {
  useEffect,
  useState,
} from "react";

import {
  Sparkles,
  Send,
  MapPin,
  HeartPulse,
  Utensils,
  Clock,
  Star,
  ShoppingCart,
} from "lucide-react";

import {
  useSearchParams,
} from "react-router-dom";

import { useCart } from "../context/CartContext";

const AIAssistant = () => {
  const { addToCart } = useCart();

  const [searchParams] = useSearchParams();

  // Get query from Home Search / Category
  const urlQuery =
    searchParams.get("query") || "";

  const [query, setQuery] =
    useState(urlQuery);

  const [loading, setLoading] =
    useState(false);

  const [recommendations, setRecommendations] =
    useState([]);

  const [message, setMessage] =
    useState("");

  // =========================
  // AI SEARCH FUNCTION
  // =========================

  const searchFood = async (searchQuery) => {
    if (!searchQuery || !searchQuery.trim()) {
      setMessage(
        "Please tell me what you want to eat."
      );
      return;
    }

    setLoading(true);
    setMessage("");
    setRecommendations([]);

    try {
const token = localStorage.getItem("token");

const response = await fetch(
  "https://smartbite-backend-ctwv.onrender.com/api/ai/recommend",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      query: searchQuery.trim(),
    }),
  }
);

      const data = await response.json();

      console.log(
        "AI Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to get recommendations"
        );
      }

      const foods =
        data.recommendations || [];

      setRecommendations(foods);

      if (foods.length > 0) {
        setMessage(
          `I found ${foods.length} food option${
            foods.length > 1
              ? "s"
              : ""
          } for you.`
        );
      } else {
        setMessage(
          "Sorry, I couldn't find matching food. Try a different search."
        );
      }
    } catch (error) {
      console.error(
        "AI Assistant Error:",
        error
      );

      setMessage(
        "Something went wrong. Please check if your backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // AUTO SEARCH FROM HOME
  // =========================

  useEffect(() => {
    if (urlQuery) {
      setQuery(urlQuery);

      // Automatically search
      searchFood(urlQuery);
    }
  }, [urlQuery]);

  // =========================
  // FORM SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    await searchFood(query);
  };

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = (food) => {
    const cartFood = {
      id: food._id,

      name: food.name,

      description:
        food.description,

      image: food.image,

      price: food.price,

      category:
        food.category,

      cuisine:
        food.cuisine,

      tags:
        food.tags || [],

      rating:
        food.rating,

      restaurantId:
        food.restaurant?._id ||
        food.restaurant,

      restaurantName:
        food.restaurant?.name ||
        food.restaurantName ||
        "SmartBite Restaurant",
    };

    addToCart(cartFood);

    setMessage(
      `${food.name} has been added to your cart.`
    );
  };

  // =========================
  // QUICK SEARCH
  // =========================

  const handleQuickSearch = (text) => {
    setQuery(text);

    // Immediately search
    searchFood(text);
  };

  return (
    <div className="min-h-screen bg-orange-50/40">

      {/* ================= HERO ================= */}

      <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">

        <div className="mx-auto max-w-4xl px-4 py-16 text-center text-white md:py-20">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <Sparkles size={32} />
          </div>

          <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">
            Ask SmartBite AI
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-orange-50">
            Tell me what you're craving, your budget, and your preferences. I'll find the perfect food for you.
          </p>

        </div>

      </section>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-5xl px-4 py-10 md:px-8">

        {/* ================= SEARCH CARD ================= */}

        <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
              <Sparkles size={24} />
            </div>

            <div>

              <h2 className="text-lg font-bold text-gray-900">
                What are you looking for?
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Try something like:

                <span className="font-medium text-orange-500">
                  {" "}
                  I want spicy chicken under ₹300
                </span>
              </p>

            </div>

          </div>

          {/* ================= SEARCH FORM ================= */}

          <form
            onSubmit={handleSubmit}
            className="mt-6"
          >

            <div className="flex flex-col gap-3 sm:flex-row">

              <input
                type="text"
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="I'm hungry, I want something spicy under ₹300..."
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-7 py-4 font-bold text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>

                    Finding...
                  </>
                ) : (
                  <>
                    <Send size={18} />

                    Find Food
                  </>
                )}

              </button>

            </div>

          </form>

          {/* ================= QUICK SUGGESTIONS ================= */}

          <div className="mt-5 flex flex-wrap gap-3">

            <button
              onClick={() =>
                handleQuickSearch(
                  "I want something spicy under ₹300"
                )
              }
              className="flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 transition hover:bg-orange-100"
            >
              <Utensils size={16} />

              Spicy under ₹300
            </button>

            <button
              onClick={() =>
                handleQuickSearch(
                  "I want a healthy high protein meal"
                )
              }
              className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-600 transition hover:bg-green-100"
            >
              <HeartPulse size={16} />

              Healthy & Protein
            </button>

            <button
              onClick={() =>
                handleQuickSearch(
                  "I want chicken biryani"
                )
              }
              className="flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              🍗

              Chicken Biryani
            </button>

          </div>

        </div>

        {/* ================= AI MESSAGE ================= */}

        {message && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50 p-5">

            <Sparkles
              size={22}
              className="shrink-0 text-orange-500"
            />

            <p className="font-medium text-gray-700">
              {message}
            </p>

          </div>
        )}

        {/* ================= RESULTS ================= */}

        {recommendations.length > 0 && (

          <section className="mt-10">

            <div className="mb-6">

              <h2 className="text-2xl font-bold text-gray-900">
                AI Picks For You
              </h2>

              <p className="mt-1 text-gray-500">
                These meals match what you asked for.
              </p>

            </div>

            {/* 2 columns on mobile */}

            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">

              {recommendations.map(
                (food) => (

                  <div
                    key={food._id}
                    className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >

                    {/* IMAGE */}

                    <div className="relative h-36 sm:h-52">

                      <img
                        src={food.image}
                        alt={food.name}
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute left-2 top-2 flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-xs font-bold shadow sm:left-3 sm:top-3 sm:text-sm">

                        <Star
                          size={13}
                          className="fill-yellow-400 text-yellow-400"
                        />

                        {food.rating ||
                          "4.0"}

                      </div>

                      <div className="absolute right-2 top-2 rounded-lg bg-orange-500 px-2 py-1 text-[10px] font-bold text-white sm:right-3 sm:top-3 sm:px-3 sm:text-xs">
                        AI Pick
                      </div>

                    </div>

                    {/* CONTENT */}

                    <div className="p-3 sm:p-5">

                      <h3 className="truncate text-sm font-bold text-gray-900 sm:text-lg">
                        {food.name}
                      </h3>

                      <p className="mt-1 truncate text-xs text-gray-500 sm:text-sm">
                        {food.restaurant?.name ||
                          food.restaurantName ||
                          "SmartBite Restaurant"}
                      </p>

                      {food.description && (
                        <p className="mt-2 hidden line-clamp-2 text-sm text-gray-500 sm:block">
                          {food.description}
                        </p>
                      )}

                      {/* INFO */}

                      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 sm:mt-4 sm:gap-4 sm:text-sm">

                        <span className="flex items-center gap-1">
                          <Clock size={13} />

                          {food.deliveryTime ||
                            30}
                          min
                        </span>

                        <span className="flex items-center gap-1">
                          <MapPin size={13} />

                          Nearby
                        </span>

                      </div>

                      {/* TAGS */}

                      {food.tags &&
                        food.tags.length > 0 && (

                          <div className="mt-3 hidden flex-wrap gap-2 sm:flex">

                            {food.tags.map(
                              (
                                tag,
                                index
                              ) => (

                                <span
                                  key={`${tag}-${index}`}
                                  className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600"
                                >
                                  {tag}
                                </span>

                              )
                            )}

                          </div>

                        )}

                      {/* BOTTOM */}

                      <div className="mt-4 flex items-center justify-between sm:mt-5">

                        <span className="text-base font-bold text-gray-900 sm:text-xl">
                          ₹{food.price}
                        </span>

                        <button
                          onClick={() =>
                            handleAddToCart(
                              food
                            )
                          }
                          className="flex items-center gap-1 rounded-xl bg-orange-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-600 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
                        >

                          <ShoppingCart
                            size={16}
                          />

                          <span className="hidden sm:inline">
                            Add
                          </span>

                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </section>

        )}

      </main>

    </div>
  );
};

export default AIAssistant;