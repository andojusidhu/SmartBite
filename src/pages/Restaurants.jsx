import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Star,
  Clock,
  Bike,
  LoaderCircle,
} from "lucide-react";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/restaurants"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch restaurants"
        );
      }

      setRestaurants(data.restaurants);
    } catch (error) {
      console.error(
        "Fetch Restaurants Error:",
        error
      );

      setError(
        "Unable to load restaurants. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
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

  // Error
  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">

        <div className="rounded-2xl bg-red-50 p-8 text-center">

          <p className="font-semibold text-red-600">
            {error}
          </p>

          <button
            onClick={fetchRestaurants}
            className="mt-5 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50/40 px-4 py-10 md:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">

          <p className="font-semibold text-orange-500">
            Discover Great Food
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Restaurants Near You
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Explore restaurants and discover delicious
            food personalized for your taste.
          </p>

        </div>


        {/* Empty State */}
        {restaurants.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

            <p className="text-xl font-bold text-gray-800">
              No restaurants found
            </p>

            <p className="mt-2 text-gray-500">
              Restaurants will appear here once they
              are added.
            </p>

          </div>
        ) : (

          /* Restaurant Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {restaurants.map((restaurant) => (

              <Link
                key={restaurant._id}
                to={`/restaurants/${restaurant._id}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Image */}
                <div className="relative h-52 overflow-hidden">

                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Open Status */}
                  <div className="absolute right-3 top-3">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
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


                {/* Content */}
                <div className="p-5">

                  <div className="flex items-start justify-between gap-3">

                    <h2 className="text-xl font-bold text-gray-900">
                      {restaurant.name}
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1">

                      <Star
                        size={14}
                        className="fill-current text-green-600"
                      />

                      <span className="text-sm font-bold text-green-700">
                        {restaurant.rating}
                      </span>

                    </div>

                  </div>


                  {/* Cuisine */}
                  <p className="mt-2 text-sm text-gray-500">
                    {restaurant.cuisine?.join(
                      " • "
                    )}
                  </p>


                  {/* Location */}
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">

                    <MapPin
                      size={16}
                      className="text-orange-500"
                    />

                    {restaurant.location}

                  </div>


                  {/* Delivery */}
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">

                    <div className="flex items-center gap-2 text-sm text-gray-600">

                      <Clock
                        size={16}
                        className="text-orange-500"
                      />

                      {restaurant.deliveryTime}

                    </div>


                    <div className="flex items-center gap-2 text-sm text-gray-600">

                      <Bike
                        size={16}
                        className="text-orange-500"
                      />

                      {restaurant.deliveryFee === 0
                        ? "Free Delivery"
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