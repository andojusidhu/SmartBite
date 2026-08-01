import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Star,
  Clock,
  Bike,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

const API_URL = " https://smartbite-backend-ctwv.onrender.com/api/restaurants";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Fetch Restaurants
  // =========================

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      console.log("Restaurants API Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch restaurants"
        );
      }

      setRestaurants(data.restaurants || []);
    } catch (error) {
      console.error("Fetch Restaurants Error:", error);

      setError(
        error.message ||
          "Unable to load restaurants. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Fetch on Page Load
  // =========================

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // =========================
  // Loading State
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-orange-50/40">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle
            size={40}
            className="animate-spin text-orange-500"
          />

          <p className="font-medium text-gray-600">
            Finding restaurants near you...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // Error State
  // =========================

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-orange-50/40 px-4">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
            <RefreshCw size={28} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            Unable to Load Restaurants
          </h2>

          <p className="mt-2 text-gray-500">
            {error}
          </p>

          <button
            onClick={fetchRestaurants}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50/40 px-3 py-8 sm:px-4 sm:py-10 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* =========================
            Header
        ========================= */}

        <div className="mb-8 sm:mb-10">
          <p className="text-sm font-semibold text-orange-500 sm:text-base">
            Discover Great Food
          </p>

          <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                Restaurants Near You
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:mt-3 sm:text-base">
                Explore restaurants and discover delicious
                food personalized for your taste.
              </p>
            </div>

            {restaurants.length > 0 && (
              <div className="w-fit rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-600 sm:px-4 sm:py-2 sm:text-sm">
                {restaurants.length} Restaurants
              </div>
            )}
          </div>
        </div>

        {/* =========================
            Empty State
        ========================= */}

        {restaurants.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-500">
              <MapPin size={36} />
            </div>

            <h2 className="mt-6 text-xl font-bold text-gray-800">
              No Restaurants Found
            </h2>

            <p className="mt-2 text-gray-500">
              Restaurants will appear here once they
              are added.
            </p>

            <button
              onClick={fetchRestaurants}
              className="mt-5 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Refresh
            </button>
          </div>
        ) : (

          /* =========================
             Restaurant Grid
          ========================= */

          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">

            {restaurants.map((restaurant) => (

              <Link
                key={restaurant._id}
                to={`/restaurants/${restaurant._id}`}
                className="group overflow-hidden rounded-xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl"
              >

                {/* =========================
                    Restaurant Image
                ========================= */}

                <div className="relative h-32 overflow-hidden sm:h-52">

                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80";
                    }}
                  />

                  {/* Open / Closed Status */}

                  <div className="absolute right-2 top-2 sm:right-3 sm:top-3">
                    <span
                      className={`rounded-full px-2 py-1 text-[9px] font-bold sm:px-3 sm:text-xs ${
                        restaurant.isOpen
                          ? "bg-green-500 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      {restaurant.isOpen
                        ? "Open"
                        : "Closed"}
                    </span>
                  </div>

                </div>

                {/* =========================
                    Restaurant Details
                ========================= */}

                <div className="p-3 sm:p-5">

                  {/* Name + Rating */}

                  <div className="flex items-start justify-between gap-1 sm:gap-3">

                    <h2 className="min-w-0 truncate text-sm font-bold text-gray-900 sm:text-xl">
                      {restaurant.name}
                    </h2>

                    <div className="flex shrink-0 items-center gap-1 rounded-md bg-green-50 px-1.5 py-1 sm:rounded-lg sm:px-2">

                      <Star
                        size={11}
                        className="fill-current text-green-600 sm:h-[14px] sm:w-[14px]"
                      />

                      <span className="text-[10px] font-bold text-green-700 sm:text-sm">
                        {restaurant.rating || "4.0"}
                      </span>

                    </div>

                  </div>

                  {/* Cuisine */}

                  <p className="mt-1 truncate text-[10px] text-gray-500 sm:mt-2 sm:text-sm">
                    {Array.isArray(restaurant.cuisine)
                      ? restaurant.cuisine.join(" • ")
                      : restaurant.cuisine || "Various Cuisine"}
                  </p>

                  {/* Location */}

                  <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-500 sm:mt-4 sm:gap-2 sm:text-sm">

                    <MapPin
                      size={12}
                      className="shrink-0 text-orange-500 sm:h-4 sm:w-4"
                    />

                    <span className="truncate">
                      {restaurant.location ||
                        "Location unavailable"}
                    </span>

                  </div>

                  {/* Delivery Information */}

                  <div className="mt-3 flex flex-col gap-1 border-t border-gray-100 pt-3 text-[10px] text-gray-600 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:pt-4 sm:text-sm">

                    <div className="flex items-center gap-1 sm:gap-2">
                      <Clock
                        size={12}
                        className="text-orange-500 sm:h-4 sm:w-4"
                      />

                      {restaurant.deliveryTime ||
                        "30-40 min"}
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                      <Bike
                        size={12}
                        className="text-orange-500 sm:h-4 sm:w-4"
                      />

                      {restaurant.deliveryFee === 0
                        ? "Free"
                        : `₹${restaurant.deliveryFee}`}
                    </div>

                  </div>

                </div>

              </Link>

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Restaurants;