import React from "react";
import { Heart, MapPin, Star, Clock } from "lucide-react";

const FoodCard = ({ food }) => {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img
          src={food.image}
          alt={food.name}
          className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <button className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-gray-700 shadow-sm transition hover:text-red-500">
          <Heart size={18} />
        </button>

        {food.isAIRecommended && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-xs font-semibold text-white">
            AI Recommended
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-gray-900">{food.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{food.restaurant}</p>
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1 text-sm font-semibold text-green-700">
            <Star size={14} fill="currentColor" />
            {food.rating}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
          <span className="font-semibold text-gray-900">
            ₹{food.price}
          </span>

          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {food.distance} km
          </span>

          <span className="flex items-center gap-1">
            <Clock size={14} />
            {food.deliveryTime} min
          </span>
        </div>

        <button className="mt-4 w-full rounded-xl bg-orange-50 py-2.5 font-semibold text-orange-600 transition hover:bg-orange-500 hover:text-white">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;