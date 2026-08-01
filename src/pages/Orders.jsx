import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Package,
  Clock,
  CheckCircle,
  Truck,
  ChefHat,
  ArrowRight,
} from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Fetch My Orders
  // =========================

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view your orders.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        " https://smartbite-backend-ctwv.onrender.com/api/orders/my-orders",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Orders Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch orders"
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Orders Error:", error);

      setError(
        error.message ||
          "Something went wrong while loading orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================
  // Status Icon
  // =========================

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock size={18} />;

      case "Preparing":
        return <ChefHat size={18} />;

      case "Out for Delivery":
        return <Truck size={18} />;

      case "Delivered":
        return <CheckCircle size={18} />;

      default:
        return <Package size={18} />;
    }
  };

  // =========================
  // Status Style
  // =========================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-50 text-yellow-600";

      case "Preparing":
        return "bg-blue-50 text-blue-600";

      case "Out for Delivery":
        return "bg-orange-50 text-orange-600";

      case "Delivered":
        return "bg-green-50 text-green-600";

      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-orange-50/40">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500"></div>

          <p className="mt-4 font-medium text-gray-600">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // Error
  // =========================

  if (error) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-orange-50/40 px-4">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-500">
            <Package size={36} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Unable to Load Orders
          </h1>

          <p className="mt-2 text-gray-500">
            {error}
          </p>

          <button
            onClick={fetchOrders}
            className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // No Orders
  // =========================

  if (orders.length === 0) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-orange-50/40 px-4">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-500">
            <ShoppingBag size={36} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            No Orders Yet
          </h1>

          <p className="mt-2 text-gray-500">
            You haven't placed any orders yet.
          </p>

          <Link
            to="/restaurants"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Order Food
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  // =========================
  // Orders Page
  // =========================

  return (
    <div className="min-h-screen bg-orange-50/40">
      <main className="mx-auto max-w-5xl px-4 py-10 md:px-8">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Orders
          </h1>

          <p className="mt-2 text-gray-500">
            Track your previous and current orders.
          </p>
        </div>

        {/* Orders */}

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              {/* Order Header */}

              <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <div
                  className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {getStatusIcon(order.status)}

                  {order.status}
                </div>
              </div>

              {/* Order Items */}

              <div className="space-y-4 p-5">
                {order.items?.map((item, index) => (
                  <div
                    key={`${item.food}-${index}`}
                    className="flex gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />

                    <div className="flex flex-1 justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {item.restaurantName}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-gray-900">
                        ₹
                        {item.price *
                          item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Address */}

              {order.deliveryAddress && (
                <div className="border-t border-gray-100 px-5 py-4">
                  <p className="text-sm font-semibold text-gray-700">
                    Delivery Address
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {order.deliveryAddress.name},{" "}
                    {order.deliveryAddress.phone}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.deliveryAddress.address},{" "}
                    {order.deliveryAddress.city} -{" "}
                    {order.deliveryAddress.pincode}
                  </p>
                </div>
              )}

              {/* Order Summary */}

              <div className="border-t border-gray-100 bg-gray-50/70 p-5">
                <div className="grid gap-3 text-sm">

                  <div className="flex justify-between text-gray-600">
                    <span>Item Total</span>
                    <span>
                      ₹{order.itemTotal}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>
                      ₹{order.deliveryFee}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Platform Fee</span>
                    <span>
                      ₹{order.platformFee}
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-gray-200 pt-3 text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>
                      ₹{order.totalAmount}
                    </span>
                  </div>

                  <div className="flex justify-between pt-1 text-sm">
                    <span className="text-gray-500">
                      Payment Method
                    </span>

                    <span className="font-semibold text-gray-700">
                      {order.paymentMethod ===
                      "COD"
                        ? "Cash on Delivery"
                        : "Online Payment"}
                    </span>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Orders;