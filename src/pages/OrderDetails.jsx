import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ChefHat,
  Truck,
  MapPin,
  Phone,
  Package,
} from "lucide-react";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Fetch Order
  // =========================

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view this order.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        ` https://smartbite-backend-ctwv.onrender.com/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Order Details:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch order"
        );
      }

      setOrder(data.order);
    } catch (error) {
      console.error("Order Details Error:", error);

      setError(
        error.message ||
          "Unable to load order details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  // =========================
  // Status Steps
  // =========================

  const statuses = [
    {
      name: "Pending",
      icon: Clock,
    },
    {
      name: "Preparing",
      icon: ChefHat,
    },
    {
      name: "Out for Delivery",
      icon: Truck,
    },
    {
      name: "Delivered",
      icon: CheckCircle,
    },
  ];

  const getStatusIndex = () => {
    if (!order) return 0;

    return statuses.findIndex(
      (status) =>
        status.name === order.status
    );
  };

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-orange-50/40">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />

          <p className="mt-4 text-gray-600">
            Loading order...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // Error
  // =========================

  if (error || !order) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-orange-50/40 px-4">
        <div className="text-center">
          <Package
            size={50}
            className="mx-auto text-red-400"
          />

          <h1 className="mt-5 text-2xl font-bold">
            Order Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            {error || "This order does not exist."}
          </p>

          <Link
            to="/orders"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const currentStatusIndex =
    getStatusIndex();

  return (
    <div className="min-h-screen bg-orange-50/40">
      <main className="mx-auto max-w-5xl px-4 py-10 md:px-8">

        {/* Back */}

        <Link
          to="/orders"
          className="mb-6 inline-flex items-center gap-2 font-medium text-gray-600 hover:text-orange-500"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </Link>

        {/* Header */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <p className="text-sm text-gray-500">
                Order ID
              </p>

              <h1 className="mt-1 text-2xl font-bold text-gray-900">
                #{order._id.slice(-8).toUpperCase()}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {new Date(
                  order.createdAt
                ).toLocaleString()}
              </p>
            </div>

            <div className="rounded-full bg-orange-50 px-5 py-2 font-semibold text-orange-600">
              {order.status}
            </div>

          </div>

        </div>

        {/* =========================
            ORDER TRACKING
        ========================= */}

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-900">
            Order Status
          </h2>

          <div className="mt-8">

            <div className="flex justify-between">

              {statuses.map(
                (status, index) => {
                  const Icon = status.icon;

                  const completed =
                    index <=
                    currentStatusIndex;

                  return (
                    <div
                      key={status.name}
                      className="relative flex flex-1 flex-col items-center"
                    >

                      {/* Connecting Line */}

                      {index <
                        statuses.length - 1 && (
                        <div
                          className={`absolute left-1/2 top-6 h-1 w-full ${
                            index <
                            currentStatusIndex
                              ? "bg-orange-500"
                              : "bg-gray-200"
                          }`}
                        />
                      )}

                      {/* Icon */}

                      <div
                        className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full ${
                          completed
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <Icon size={21} />
                      </div>

                      <p
                        className={`mt-3 text-center text-xs font-semibold sm:text-sm ${
                          completed
                            ? "text-orange-600"
                            : "text-gray-400"
                        }`}
                      >
                        {status.name}
                      </p>

                    </div>
                  );
                }
              )}

            </div>

          </div>

        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* =========================
              ORDER ITEMS
          ========================= */}

          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">

            <h2 className="text-xl font-bold text-gray-900">
              Ordered Items
            </h2>

            <div className="mt-6 space-y-5">

              {order.items?.map(
                (item, index) => (
                  <div
                    key={`${item.food}-${index}`}
                    className="flex gap-4 border-b border-gray-100 pb-5 last:border-0"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />

                    <div className="flex-1">

                      <h3 className="font-bold text-gray-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.restaurantName}
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        ₹{item.price} ×{" "}
                        {item.quantity}
                      </p>

                    </div>

                    <p className="font-bold text-gray-900">
                      ₹
                      {item.price *
                        item.quantity}
                    </p>

                  </div>
                )
              )}

            </div>

          </div>

          {/* =========================
              DELIVERY DETAILS
          ========================= */}

          <div className="space-y-6">

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Delivery Address
              </h2>

              <div className="mt-5 space-y-3">

                <div className="flex gap-3">
                  <MapPin
                    size={20}
                    className="shrink-0 text-orange-500"
                  />

                  <div>
                    <p className="font-semibold text-gray-900">
                      {order.deliveryAddress?.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {order.deliveryAddress?.address}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.deliveryAddress?.city} -{" "}
                      {order.deliveryAddress?.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone
                    size={20}
                    className="shrink-0 text-orange-500"
                  />

                  <p className="text-sm text-gray-600">
                    {order.deliveryAddress?.phone}
                  </p>
                </div>

              </div>

            </div>

            {/* =========================
                PAYMENT SUMMARY
            ========================= */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Payment Summary
              </h2>

              <div className="mt-5 space-y-3 text-sm">

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

                <div className="flex justify-between border-t border-gray-100 pt-4 text-lg font-bold text-gray-900">
                  <span>Total</span>

                  <span>
                    ₹{order.totalAmount}
                  </span>
                </div>

                <div className="pt-2">

                  <p className="text-sm text-gray-500">
                    Payment Method
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {order.paymentMethod ===
                    "COD"
                      ? "Cash on Delivery"
                      : "Online Payment"}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default OrderDetails;