import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Star,
  Clock,
  Bike,
  LoaderCircle,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const RestaurantDetails = () => {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Stores the food item that was recently added
  const [addedFood, setAddedFood] = useState(null);

  // =========================
  // Fetch Restaurant & Foods
  // =========================

  useEffect(() => {
    fetchRestaurantFoods();
  }, [id]);

  const fetchRestaurantFoods = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://smartbite-backend-ctwv.onrender.com/api/foods/restaurant/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch restaurant"
        );
      }

      setRestaurant(data.restaurant);
      setFoods(data.foods || []);
    } catch (error) {
      console.error(
        "Restaurant Details Error:",
        error
      );

      setError(
        "Unable to load restaurant details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Add Food To Cart
  // =========================

  const handleAddToCart = (food) => {
    // Don't add unavailable food
    if (!food.isAvailable) {
      return;
    }

    // Don't add food if restaurant is closed
    if (!restaurant.isOpen) {
      return;
    }

    // Add food to cart
    addToCart({
      id: food._id,
      name: food.name,
      description: food.description,
      image: food.image,
      price: food.price,
      category: food.category,
      cuisine: food.cuisine,
      tags: food.tags || [],
      rating: food.rating,
      restaurantId: restaurant._id,
      restaurantName: restaurant.name,
    });

    // Show success state
    setAddedFood(food._id);

    // Reset button after 1.5 seconds
    setTimeout(() => {
      setAddedFood(null);
    }, 1500);
  };

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
            Loading restaurant...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // Error State
  // =========================

  if (error || !restaurant) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-orange-50/40 px-4">
        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-500">
            <ShoppingCart size={36} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Restaurant Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            {error || "Unable to load this restaurant."}
          </p>

          <button
            onClick={fetchRestaurantFoods}
            className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50/40">

      {/* =========================
          RESTAURANT HEADER
      ========================= */}

      <section className="relative h-72 overflow-hidden md:h-80">

        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Restaurant Information */}

        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-4 pb-8 md:px-8">

          {/* Open / Closed */}

          <div className="flex flex-wrap items-center gap-3">

            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                restaurant.isOpen
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {restaurant.isOpen
                ? "Open Now"
                : "Closed"}
            </span>

          </div>

          {/* Restaurant Name */}

          <h1 className="mt-3 text-3xl font-extrabold text-white md:text-5xl">
            {restaurant.name}
          </h1>

          {/* Cuisine */}

          <p className="mt-2 text-sm text-white/90 md:text-base">
            {restaurant.cuisine?.join(" • ")}
          </p>

          {/* Restaurant Information */}

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white">

            {/* Rating */}

            <span className="flex items-center gap-1">
              <Star
                size={17}
                className="fill-yellow-400 text-yellow-400"
              />

              {restaurant.rating}
            </span>

            {/* Delivery Time */}

            <span className="flex items-center gap-1">
              <Clock size={17} />

              {restaurant.deliveryTime}
            </span>

            {/* Location */}

            <span className="flex items-center gap-1">
              <MapPin size={17} />

              {restaurant.location}
            </span>

            {/* Delivery Fee */}

            <span className="flex items-center gap-1">
              <Bike size={17} />

              {restaurant.deliveryFee === 0
                ? "Free Delivery"
                : `₹${restaurant.deliveryFee} Delivery`}
            </span>

          </div>

        </div>

      </section>

      {/* =========================
          FOOD MENU
      ========================= */}

      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">

        {/* Menu Header */}

        <div className="mb-8">

          <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
            Menu
          </h2>

          <p className="mt-2 text-gray-500">
            Choose your favorite food from{" "}
            <span className="font-semibold text-orange-500">
              {restaurant.name}
            </span>
          </p>

        </div>

        {/* =========================
            EMPTY MENU
        ========================= */}

        {foods.length === 0 ? (

          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-500">
              <ShoppingCart size={28} />
            </div>

            <p className="mt-4 text-xl font-bold text-gray-700">
              No food items available
            </p>

            <p className="mt-2 text-gray-500">
              This restaurant currently has no available food items.
            </p>

          </div>

        ) : (

          /* =========================
             FOOD GRID
          ========================= */

          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">

            {foods.map((food) => (

              <div
                key={food._id}
                className="group overflow-hidden rounded-xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl"
              >

                {/* =========================
                    FOOD IMAGE
                ========================= */}

                <div className="relative h-32 overflow-hidden sm:h-52">

                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Veg Badge */}

                  {food.isVeg && (
                    <span className="absolute left-2 top-2 rounded-full bg-green-500 px-2 py-1 text-[10px] font-bold text-white shadow sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
                      VEG
                    </span>
                  )}

                  {/* Food Rating */}

                  {food.rating && (
                    <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-white px-1.5 py-1 text-[10px] font-bold shadow sm:right-3 sm:top-3 sm:rounded-lg sm:px-2 sm:text-sm">

                      <Star
                        size={12}
                        className="fill-yellow-400 text-yellow-400 sm:h-[14px] sm:w-[14px]"
                      />

                      {food.rating}

                    </div>
                  )}

                  {/* Unavailable Overlay */}

                  {!food.isAvailable && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">

                      <span className="rounded-full bg-white px-2 py-1 text-[9px] font-bold text-gray-700 sm:px-4 sm:py-2 sm:text-sm">
                        Unavailable
                      </span>

                    </div>
                  )}

                </div>

                {/* =========================
                    FOOD CONTENT
                ========================= */}

                <div className="p-3 sm:p-5">

                  {/* Name & Price */}

                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">

                    <h3 className="truncate text-sm font-bold text-gray-900 sm:text-lg">
                      {food.name}
                    </h3>

                    <span className="text-sm font-bold text-orange-500 sm:text-lg">
                      ₹{food.price}
                    </span>

                  </div>

                  {/* Description */}

                  {food.description && (
                    <p className="mt-2 line-clamp-2 text-xs text-gray-500 sm:text-sm">
                      {food.description}
                    </p>
                  )}

                  {/* Tags */}

                  {food.tags?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1 sm:mt-4 sm:gap-2">

                      {food.tags
                        .slice(0, 2)
                        .map((tag) => (

                          <span
                            key={tag}
                            className="rounded-full bg-orange-50 px-2 py-1 text-[9px] font-medium text-orange-600 sm:px-2.5 sm:text-xs"
                          >
                            {tag}
                          </span>

                        ))}

                    </div>
                  )}

                  {/* =========================
                      ADD TO CART BUTTON
                  ========================= */}

                  <button
                    onClick={() =>
                      handleAddToCart(food)
                    }
                    disabled={
                      !restaurant.isOpen ||
                      !food.isAvailable
                    }
                    className={`mt-4 flex w-full items-center justify-center gap-1 rounded-lg py-2 text-xs font-semibold text-white transition sm:mt-5 sm:gap-2 sm:rounded-xl sm:py-3 sm:text-sm ${
                      addedFood === food._id
                        ? "bg-green-500"
                        : "bg-orange-500 hover:bg-orange-600"
                    } ${
                      !restaurant.isOpen ||
                      !food.isAvailable
                        ? "cursor-not-allowed bg-gray-400 hover:bg-gray-400"
                        : ""
                    }`}
                  >

                    {addedFood === food._id ? (
                      <>
                        <CheckCircle size={15} />

                        <span className="hidden sm:inline">
                          Added to Cart
                        </span>

                        <span className="sm:hidden">
                          Added
                        </span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={15} />

                        <span className="sm:hidden">
                          {!restaurant.isOpen
                            ? "Closed"
                            : !food.isAvailable
                            ? "Unavailable"
                            : "Add"}
                        </span>

                        <span className="hidden sm:inline">
                          {!restaurant.isOpen
                            ? "Restaurant Closed"
                            : !food.isAvailable
                            ? "Unavailable"
                            : "Add to Cart"}
                        </span>
                      </>
                    )}

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
};

export default RestaurantDetails;