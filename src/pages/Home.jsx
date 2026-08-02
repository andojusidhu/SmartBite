import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  LoaderCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import RestaurantCard from "../components/RestaurantCard";
import RecommendedFoods from "../components/RecommendedFoods";

// =========================
// CATEGORIES
// =========================

const categories = [
  {
    name: "Biryani",
    image:
      "https://img.freepik.com/premium-photo/traditional-chicken-biryani-aromatic-indian-cuisine-food_1124848-123286.jpg?w=2000",
  },
  {
    name: "Pizza",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Chinese",
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Healthy",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Desserts",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80",
  },
];

const Home = () => {

  // =========================
  // RESTAURANT STATE
  // =========================

  const [restaurants, setRestaurants] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] =
    useState(true);
  const [restaurantError, setRestaurantError] =
    useState("");

  // =========================
  // FETCH POPULAR RESTAURANTS
  // =========================

  useEffect(() => {
    fetchPopularRestaurants();
  }, []);

  const fetchPopularRestaurants = async () => {
    try {
      setLoadingRestaurants(true);
      setRestaurantError("");

      const response = await fetch(
        "https://smartbite-backend-ctwv.onrender.com/api/restaurants"
      );

      const data = await response.json();

      console.log(
        "Restaurants API Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch restaurants"
        );
      }

      // Sort by rating
      const popularRestaurants = (
        data.restaurants || []
      )
        .filter(
          (restaurant) =>
            restaurant.isOpen !== false
        )
        .sort(
          (a, b) =>
            (b.rating || 0) -
            (a.rating || 0)
        )
        .slice(0, 6);

      setRestaurants(
        popularRestaurants
      );

    } catch (error) {
      console.error(
        "Popular Restaurants Error:",
        error
      );

      setRestaurantError(
        error.message ||
          "Failed to load restaurants"
      );

    } finally {
      setLoadingRestaurants(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50/30">

      {/* ================= HERO SECTION ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">

        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">

          <div className="mx-auto max-w-4xl text-center text-white">

            {/* AI Badge */}

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">

              <Sparkles size={17} />

              AI-Powered Food Discovery

            </div>

            {/* Heading */}

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">

              Find Food That

              <span className="block text-orange-100">
                Fits You.
              </span>

            </h1>

            {/* Description */}

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-orange-50 md:text-xl">

              Tell SmartBite what you're craving,
              and let AI find the perfect meal
              for your taste, budget, and lifestyle.

            </p>

            {/* Search */}

            <div className="mx-auto mt-10 max-w-3xl text-left">

              <SearchBar />

            </div>

          </div>

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">

        <div>

          <h2 className="text-2xl font-bold text-gray-900">
            Explore Categories
          </h2>

          <p className="mt-1 text-gray-500">
            What are you craving today?
          </p>

        </div>


        <div className="mt-7 grid grid-cols-3 gap-4 sm:grid-cols-6">

          {categories.map(
            (category) => (

              <button
                key={category.name}
                className="group text-center"
              >

                <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-md transition group-hover:scale-105 group-hover:border-orange-200 sm:h-24 sm:w-24">

                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover"
                  />

                </div>

                <p className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-orange-500">
                  {category.name}
                </p>

              </button>

            )
          )}

        </div>

      </section>


      {/* ================= AI RECOMMENDATIONS ================= */}

      <RecommendedFoods />


      {/* ================= POPULAR NEAR YOU ================= */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">

          {/* HEADER */}

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">
                Popular Near You
              </h2>

              <p className="mt-1 text-gray-500">
                Discover top-rated restaurants around you.
              </p>

            </div>


            <Link
              to="/restaurants"
              className="flex items-center gap-2 font-semibold text-orange-600 hover:text-orange-700"
            >

              View All

              <ArrowRight size={18} />

            </Link>

          </div>


          {/* LOADING */}

          {loadingRestaurants && (

            <div className="flex items-center justify-center py-12">

              <LoaderCircle
                size={32}
                className="animate-spin text-orange-500"
              />

            </div>

          )}


          {/* ERROR */}

          {!loadingRestaurants &&
            restaurantError && (

              <div className="mt-7 rounded-2xl bg-red-50 p-6 text-center">

                <p className="font-medium text-red-600">
                  Failed to load restaurants
                </p>

                <p className="mt-1 text-sm text-red-500">
                  {restaurantError}
                </p>

                <button
                  onClick={
                    fetchPopularRestaurants
                  }
                  className="mt-4 rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Try Again
                </button>

              </div>

            )}


          {/* NO RESTAURANTS */}

          {!loadingRestaurants &&
            !restaurantError &&
            restaurants.length === 0 && (

              <div className="mt-7 rounded-2xl bg-orange-50 p-8 text-center">

                <p className="font-semibold text-gray-800">
                  No restaurants available
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Check back later for restaurants near you.
                </p>

              </div>

            )}


          {/* RESTAURANT CARDS */}

          {!loadingRestaurants &&
            !restaurantError &&
            restaurants.length > 0 && (

              <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">

                {restaurants.map(
                  (restaurant) => (

                    <RestaurantCard
                      key={
                        restaurant._id
                      }
                      restaurant={
                        restaurant
                      }
                    />

                  )
                )}

              </div>

            )}

        </div>

      </section>


      {/* ================= AI CTA ================= */}

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">

        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-red-600 p-8 text-white md:p-12">

          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

            <div className="max-w-2xl">

              <div className="mb-3 flex items-center gap-2">

                <Sparkles size={22} />

                <span className="font-semibold">
                  SmartBite AI
                </span>

              </div>

              <h2 className="text-3xl font-bold md:text-4xl">
                Don't know what to eat?
              </h2>

              <p className="mt-3 text-orange-50">

                Tell our AI what you're craving,
                your budget, and your preferences.
                We'll find the perfect food for you.

              </p>

            </div>


            <Link
              to="/ai-assistant"
              className="whitespace-nowrap rounded-xl bg-white px-6 py-3 font-bold text-orange-600 shadow-lg transition hover:scale-105"
            >
              Ask SmartBite AI
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;