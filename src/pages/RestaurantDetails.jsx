import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Star,
  Clock,
  Bike,
  LoaderCircle,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const RestaurantDetails = () => {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRestaurantFoods();
  }, [id]);

  const fetchRestaurantFoods = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/foods/restaurant/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch restaurant"
        );
      }

      setRestaurant(data.restaurant);
      setFoods(data.foods);

    } catch (error) {
      console.error(error);

      setError(
        "Unable to load restaurant details."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">

        <LoaderCircle
          size={40}
          className="animate-spin text-orange-500"
        />

      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">

        <p className="font-semibold text-red-500">
          {error}
        </p>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50/40">

      {/* Restaurant Header */}
      <div className="relative h-72 overflow-hidden">

        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-4 pb-8 md:px-8">

          <h1 className="text-3xl font-extrabold text-white md:text-5xl">
            {restaurant.name}
          </h1>

          <p className="mt-2 text-white/90">
            {restaurant.cuisine?.join(" • ")}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white">

            <span className="flex items-center gap-1">
              <Star
                size={17}
                className="fill-yellow-400 text-yellow-400"
              />
              {restaurant.rating}
            </span>

            <span className="flex items-center gap-1">
              <Clock size={17} />
              {restaurant.deliveryTime}
            </span>

            <span className="flex items-center gap-1">
              <MapPin size={17} />
              {restaurant.location}
            </span>

            <span className="flex items-center gap-1">
              <Bike size={17} />
              {restaurant.deliveryFee === 0
                ? "Free Delivery"
                : `₹${restaurant.deliveryFee}`}
            </span>

          </div>

        </div>

      </div>


      {/* Food Section */}
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">

        <h2 className="text-2xl font-extrabold text-gray-900">
          Menu
        </h2>

        <p className="mt-2 text-gray-500">
          Choose your favorite food
        </p>


        {/* Food Grid */}
        {foods.length === 0 ? (

          <div className="mt-8 rounded-2xl bg-white p-10 text-center">

            <p className="font-semibold text-gray-700">
              No food items available
            </p>

          </div>

        ) : (

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {foods.map((food) => (

              <div
                key={food._id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg"
              >

                {/* Food Image */}
                <div className="relative h-48">

                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-full w-full object-cover"
                  />

                  {food.isVeg && (
                    <span className="absolute left-3 top-3 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
                      VEG
                    </span>
                  )}

                </div>


                {/* Food Details */}
                <div className="p-5">

                  <div className="flex justify-between gap-3">

                    <h3 className="text-lg font-bold text-gray-900">
                      {food.name}
                    </h3>

                    <span className="font-bold text-orange-500">
                      ₹{food.price}
                    </span>

                  </div>


                  <p className="mt-2 text-sm text-gray-500">
                    {food.description}
                  </p>


                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-2">

                    {food.tags?.map((tag) => (

                      <span
                        key={tag}
                        className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-600"
                      >
                        {tag}
                      </span>

                    ))}

                  </div>


                  {/* Add Button */}
<button
onClick={() =>
  addToCart({
    id: food._id,
    name: food.name,
    image: food.image,
    price: food.price,
    restaurantId: restaurant._id,
    restaurantName: restaurant.name,
  })
}
>

                    <ShoppingCart size={18} />

                    Add to Cart

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