import React, { useEffect, useState } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  LoaderCircle,
} from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setOrders(data.orders);
    } catch (err) {
      console.error(err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const statusIcon = (status) => {
    switch (status) {
      case "Pending":
        return (
          <Clock
            className="text-yellow-500"
            size={18}
          />
        );

      case "Preparing":
        return (
          <Package
            className="text-orange-500"
            size={18}
          />
        );

      case "Out for Delivery":
        return (
          <Truck
            className="text-blue-500"
            size={18}
          />
        );

      case "Delivered":
        return (
          <CheckCircle
            className="text-green-500"
            size={18}
          />
        );

      default:
        return (
          <Clock
            className="text-gray-500"
            size={18}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <LoaderCircle
          className="animate-spin text-orange-500"
          size={40}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 text-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50/40 px-4 py-10">

      <div className="mx-auto max-w-6xl">

        <h1 className="mb-2 text-3xl font-bold">
          My Orders
        </h1>

        <p className="mb-8 text-gray-500">
          Track your previous food orders.
        </p>

        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">

            <Package
              size={50}
              className="mx-auto text-orange-500"
            />

            <h2 className="mt-4 text-xl font-bold">
              No Orders Yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your placed orders will appear here.
            </p>

          </div>
        ) : (

          <div className="space-y-8">

            {orders.map((order) => (

              <div
                key={order._id}
                className="rounded-2xl bg-white p-6 shadow"
              >

                {/* Header */}

                <div className="flex flex-col justify-between gap-4 md:flex-row">

                  <div>

                    <h2 className="font-bold text-lg">
                      Order #{order._id.slice(-6)}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>

                  </div>

                  <div className="flex items-center gap-2">

                    {statusIcon(order.status)}

                    <span className="font-semibold">
                      {order.status}
                    </span>

                  </div>

                </div>

                {/* Items */}

                <div className="mt-6 space-y-4">

                  {order.items.map((item) => (

                    <div
                      key={item.food}
                      className="flex items-center gap-4 border-b pb-4"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">

                        <h3 className="font-semibold">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {item.restaurantName}
                        </p>

                      </div>

                      <div className="text-right">

                        <p>
                          x{item.quantity}
                        </p>

                        <p className="font-bold">
                          ₹
                          {item.price *
                            item.quantity}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

                {/* Footer */}

                <div className="mt-6 flex flex-col justify-between gap-4 border-t pt-4 md:flex-row">

                  <div>

                    <p className="font-semibold">
                      Delivery Address
                    </p>

                    <p className="text-gray-500">
                      {
                        order.deliveryAddress
                          .address
                      }
                    </p>

                    <p className="text-gray-500">
                      {
                        order.deliveryAddress
                          .city
                      }
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-gray-500">
                      Payment
                    </p>

                    <p className="font-semibold">
                      {order.paymentMethod}
                    </p>

                    <p className="mt-2 text-2xl font-bold text-orange-500">
                      ₹{order.totalAmount}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Orders;