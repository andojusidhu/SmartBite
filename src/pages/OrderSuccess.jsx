import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Home,
  ShoppingBag,
  Clock,
} from "lucide-react";

const OrderSuccess = () => {
  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-orange-50/40 px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-lg md:p-10">

        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-500">
          <CheckCircle size={48} />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="mx-auto mt-3 max-w-md text-gray-500">
          Thank you for ordering with SmartBite. Your delicious
          food is being prepared and will be delivered soon.
        </p>

        {/* Order Info */}
        <div className="mt-8 rounded-2xl bg-orange-50 p-5 text-left">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-100 p-3 text-orange-500">
              <ShoppingBag size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Order ID
              </p>

              <p className="font-bold text-gray-900">
                #SB{Math.floor(Math.random() * 900000 + 100000)}
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="rounded-xl bg-orange-100 p-3 text-orange-500">
              <Clock size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Estimated Delivery
              </p>

              <p className="font-bold text-gray-900">
                25 - 35 minutes
              </p>
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

          <Link
            to="/restaurants"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3 font-semibold text-white transition hover:shadow-lg"
          >
            <ShoppingBag size={18} />
            Order More
          </Link>

          <Link
            to="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <Home size={18} />
            Go Home
          </Link>

        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;