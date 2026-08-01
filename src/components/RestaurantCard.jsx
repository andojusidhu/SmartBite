import React from "react";
import { Clock, MapPin, Star } from "lucide-react";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="absolute bottom-3 left-3 rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-gray-800 shadow">
          {restaurant.deliveryTime} min
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-gray-900">
              {restaurant.name}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {restaurant.cuisine}
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1 text-sm font-semibold text-green-700">
            <Star size={14} fill="currentColor" />
            {restaurant.rating}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {restaurant.distance} km
          </span>

          <span className="flex items-center gap-1">
            <Clock size={14} />
            {restaurant.deliveryTime} min
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;