import React from "react";
import {
  Clock,
  MapPin,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({
  restaurant,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      `/restaurants/${restaurant._id}`
    );
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >

      {/* IMAGE */}

      <div className="relative">

        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-36 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-48"
        />

        {/* DELIVERY TIME */}

        <div className="absolute bottom-2 left-2 rounded-lg bg-white px-2 py-1 text-xs font-semibold text-gray-800 shadow sm:bottom-3 sm:left-3 sm:px-3 sm:py-1.5 sm:text-sm">
          {restaurant.deliveryTime}
        </div>

      </div>


      {/* CONTENT */}

      <div className="p-3 sm:p-4">

        <div className="flex items-start justify-between gap-2">

          <div className="min-w-0">

            <h3 className="truncate text-sm font-bold text-gray-900 sm:text-base">
              {restaurant.name}
            </h3>

            <p className="mt-1 truncate text-xs text-gray-500 sm:text-sm">
              {Array.isArray(
                restaurant.cuisine
              )
                ? restaurant.cuisine.join(
                    " • "
                  )
                : restaurant.cuisine}
            </p>

          </div>


          {/* RATING */}

          <div className="flex shrink-0 items-center gap-1 rounded-lg bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">

            <Star
              size={13}
              fill="currentColor"
            />

            {restaurant.rating || "4.0"}

          </div>

        </div>


        {/* LOCATION */}

        <div className="mt-3 flex items-center gap-1 text-xs text-gray-500 sm:mt-4 sm:text-sm">

          <MapPin size={14} />

          <span className="truncate">
            {restaurant.location}
          </span>

        </div>


        {/* DELIVERY */}

        <div className="mt-2 flex items-center gap-1 text-xs text-gray-500 sm:text-sm">

          <Clock size={14} />

          {restaurant.deliveryTime}

        </div>

      </div>

    </div>
  );
};

export default RestaurantCard;