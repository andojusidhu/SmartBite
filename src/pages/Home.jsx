import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import FoodCard from "../components/FoodCard";
import RestaurantCard from "../components/RestaurantCard";

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

const recommendedFoods = [
  {
    id: 1,
    name: "Chicken Tikka Bowl",
    restaurant: "Spice Garden",
    price: 249,
    rating: 4.7,
    distance: 2.3,
    deliveryTime: 25,
    isAIRecommended: true,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Chicken Biryani",
    restaurant: "Biryani House",
    price: 229,
    rating: 4.8,
    distance: 1.8,
    deliveryTime: 30,
    isAIRecommended: true,
    image:
      "https://img.freepik.com/premium-photo/traditional-chicken-biryani-aromatic-indian-cuisine-food_1124848-123286.jpg?w=2000",
  },
  {
    id: 3,
    name: "Paneer Protein Bowl",
    restaurant: "Healthy Bites",
    price: 219,
    rating: 4.6,
    distance: 3.1,
    deliveryTime: 20,
    isAIRecommended: false,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  },
];

const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    cuisine: "Indian • North Indian",
    rating: 4.7,
    distance: 2.3,
    deliveryTime: 25,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Urban Bites",
    cuisine: "Burgers • Fast Food",
    rating: 4.5,
    distance: 1.5,
    deliveryTime: 20,
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Healthy Bites",
    cuisine: "Healthy • Vegetarian",
    rating: 4.6,
    distance: 3.1,
    deliveryTime: 30,
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-orange-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
              <Sparkles size={17} />
              AI-Powered Food Discovery
            </div>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
              Find Food That
              <span className="block text-orange-100">
                Fits You.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-orange-50 md:text-xl">
              Tell SmartBite what you're craving, and let AI find the
              perfect meal for your taste, budget, and lifestyle.
            </p>

            <div className="mx-auto mt-10 max-w-3xl text-left">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
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
          {categories.map((category) => (
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
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="text-orange-500" size={22} />

              <h2 className="text-2xl font-bold text-gray-900">
                Recommended For You
              </h2>
            </div>

            <p className="mt-1 text-gray-500">
              Personalized picks based on your taste and preferences.
            </p>
          </div>

          <Link
            to="/recommendations"
            className="flex items-center gap-2 font-semibold text-orange-600 hover:text-orange-700"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>

      {/* Restaurants */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
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

          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI CTA */}
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
                Tell our AI what you're craving, your budget, and your
                preferences. We'll find the perfect food for you.
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