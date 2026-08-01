import React, { useEffect, useState } from "react";
import {
  Star,
  Sparkles,
  LoaderCircle,
  ShoppingCart,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const RecommendedFoods = () => {
  const { addToCart } = useCart();

  const [foods, setFoods] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedFood, setAddedFood] = useState("");

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      // If user is not logged in,
      // get popular foods
      if (!token) {
        const response = await fetch(
          " https://smartbite-backend-ctwv.onrender.com/api/foods"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch foods"
          );
        }

        const popularFoods = (data.foods || [])
          .filter((food) => food.isAvailable)
          .sort(
            (a, b) =>
              (b.rating || 0) - (a.rating || 0)
          )
          .slice(0, 8);

        setFoods(popularFoods);
        setType("popular");

        return;
      }

      // Logged-in user
      // Get personalized recommendations
      const response = await fetch(
        " https://smartbite-backend-ctwv.onrender.com/api/recommendations",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log(
        "Recommendation API Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch recommendations"
        );
      }

      setFoods(data.recommendations || []);
      setType(data.type || "personalized");

    } catch (error) {
      console.error(
        "Recommendation Error:",
        error
      );

      setError(error.message);

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = (food) => {
    const restaurantId =
      food.restaurant?._id ||
      food.restaurant;

    const restaurantName =
      food.restaurant?.name ||
      food.restaurantName ||
      "SmartBite Restaurant";

    const cartFood = {
      id: food._id,

      name: food.name,

      description: food.description || "",

      image: food.image,

      price: food.price,

      category: food.category,

      cuisine: food.cuisine,

      tags: food.tags || [],

      rating: food.rating || 4.0,

      restaurantId: restaurantId,

      restaurantName: restaurantName,
    };

    addToCart(cartFood);

    setAddedFood(food._id);

    setTimeout(() => {
      setAddedFood("");
    }, 2000);
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="flex items-center justify-center py-10">

          <LoaderCircle
            size={32}
            className="animate-spin text-orange-500"
          />

        </div>
      </section>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">

        <div className="rounded-xl bg-red-50 p-5 text-center">

          <p className="font-medium text-red-600">
            Failed to load recommendations
          </p>

          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>

        </div>

      </section>
    );
  }

  // =========================
  // NO FOOD
  // =========================

  if (foods.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">

        <div className="rounded-2xl bg-orange-50 p-8 text-center">

          <Sparkles
            size={30}
            className="mx-auto text-orange-500"
          />

          <h2 className="mt-3 text-2xl font-bold text-gray-900">
            Recommended For You
          </h2>

          <p className="mt-2 text-gray-500">
            We're still learning your taste.
            Explore some food and place your
            first order!
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>

          <div className="flex items-center gap-2">

            <Sparkles
              size={22}
              className="text-orange-500"
            />

            <h2 className="text-2xl font-bold text-gray-900">
              Recommended For You
            </h2>

          </div>

          <p className="mt-1 text-gray-500">
            {type === "personalized"
              ? "Personalized picks based on your taste and previous orders."
              : "Popular food picks you might enjoy."}
          </p>

        </div>

      </div>

      {/* ================= FOOD CARDS ================= */}

      <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">

        {foods.map((food) => (

          <div
            key={food._id}
            className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >

            {/* IMAGE */}

            <div className="relative h-36 sm:h-48">

              <img
                src={food.image}
                alt={food.name}
                className="h-full w-full object-cover"
              />

              {/* RATING */}

              <div className="absolute right-2 top-2 flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-xs font-semibold shadow sm:right-3 sm:top-3 sm:text-sm">

                <Star
                  size={14}
                  className="fill-yellow-400 text-yellow-400"
                />

                {food.rating || "4.0"}

              </div>

            </div>

            {/* CONTENT */}

            <div className="p-3 sm:p-4">

              <h3 className="truncate text-base font-bold text-gray-900 sm:text-lg">
                {food.name}
              </h3>

              <p className="mt-1 truncate text-xs text-gray-500 sm:text-sm">
                {food.cuisine}
              </p>

              {/* TAGS */}

              {food.tags &&
                food.tags.length > 0 && (

                  <div className="mt-2 hidden flex-wrap gap-1 sm:flex">

                    {food.tags
                      .slice(0, 3)
                      .map((tag) => (

                        <span
                          key={tag}
                          className="rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-600"
                        >
                          {tag}
                        </span>

                      ))}

                  </div>

                )}

              {/* PRICE + VEG */}

              <div className="mt-3 flex items-center justify-between">

                <span className="text-base font-bold text-gray-900 sm:text-lg">
                  ₹{food.price}
                </span>

                {food.isVeg && (

                  <span className="rounded-md border border-green-500 px-1.5 py-0.5 text-xs font-medium text-green-600">
                    Veg
                  </span>

                )}

              </div>

              {/* ADD TO CART */}

              <button
                onClick={() =>
                  handleAddToCart(food)
                }
                className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-white transition ${
                  addedFood === food._id
                    ? "bg-green-500"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >

                <ShoppingCart size={17} />

                {addedFood === food._id
                  ? "Added"
                  : "Add to Cart"}

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default RecommendedFoods;