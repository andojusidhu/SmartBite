import React, { useState } from "react";
import {
  Send,
  Sparkles,
  Star,
  MapPin,
  Clock,
  ShoppingCart,
  User,
} from "lucide-react";

const mockRecommendations = [
  {
    id: 1,
    name: "Chicken Tikka Bowl",
    restaurant: "Spice Garden",
    price: 249,
    rating: 4.7,
    distance: 2.3,
    deliveryTime: 25,
    match: 95,
    protein: "35g Protein",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Chicken Shawarma",
    restaurant: "Urban Bites",
    price: 199,
    rating: 4.5,
    distance: 1.8,
    deliveryTime: 20,
    match: 89,
    protein: "28g Protein",
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Paneer Protein Bowl",
    restaurant: "Healthy Bites",
    price: 229,
    rating: 4.6,
    distance: 3.1,
    deliveryTime: 30,
    match: 84,
    protein: "30g Protein",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  },
];

const AIAssistant = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userMessage,
      },
      {
        type: "ai",
        text: "I found some great options based on your preferences. Here are my top recommendations for you!",
      },
    ]);

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-orange-50/40">
      {/* Header */}
      <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 px-4 py-14 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <Sparkles size={30} />
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Your Personal AI Food Assistant
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-orange-50">
            Tell me what you're craving, your budget, and your preferences.
            I'll find the perfect food for you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-10">
        {/* Chat Box */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b border-gray-100 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Sparkles size={22} />
            </div>

            <div>
              <h2 className="font-bold text-gray-900">
                SmartBite AI
              </h2>

              <p className="text-sm text-green-600">
                ● Ready to help
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="min-h-[250px] space-y-5 bg-gray-50 p-5">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                  <Sparkles size={28} />
                </div>

                <h3 className="text-lg font-bold text-gray-800">
                  What are you craving?
                </h3>

                <p className="mt-2 max-w-md text-sm text-gray-500">
                  Try something like "I want spicy food under ₹300"
                  or "Suggest a healthy vegetarian dinner."
                </p>
              </div>
            ) : (
              messages.map((item, index) => (
                <div
                  key={index}
                  className={`flex ${
                    item.type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[85%] items-start gap-3 ${
                      item.type === "user"
                        ? "flex-row-reverse"
                        : ""
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        item.type === "user"
                          ? "bg-orange-500 text-white"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {item.type === "user" ? (
                        <User size={17} />
                      ) : (
                        <Sparkles size={17} />
                      )}
                    </div>

                    <div
                      className={`rounded-2xl px-4 py-3 text-sm ${
                        item.type === "user"
                          ? "rounded-tr-sm bg-orange-500 text-white"
                          : "rounded-tl-sm bg-white text-gray-700 shadow-sm"
                      }`}
                    >
                      {item.text}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 p-4">
            <div className="flex gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-2 focus-within:border-orange-400">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Example: I want spicy food under ₹300..."
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
              />

              <button
                onClick={handleSend}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2.5 font-semibold text-white transition hover:shadow-lg"
              >
                <Send size={17} />
                <span className="hidden sm:block">Ask AI</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {messages.length > 0 && (
          <section className="mt-10">
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="text-orange-500" size={22} />

                <h2 className="text-2xl font-bold text-gray-900">
                  AI Recommendations
                </h2>
              </div>

              <p className="mt-2 text-gray-500">
                These meals match your preferences and budget.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockRecommendations.map((food) => (
                <div
                  key={food.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="h-48 w-full object-cover"
                    />

                    <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-sm font-bold text-orange-600 shadow">
                      {food.match}% Match
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900">
                      {food.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {food.restaurant}
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      <span className="flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1 text-sm font-semibold text-green-700">
                        <Star size={14} fill="currentColor" />
                        {food.rating}
                      </span>

                      <span className="font-semibold text-gray-900">
                        ₹{food.price}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {food.distance} km
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {food.deliveryTime} min
                      </span>

                      <span className="rounded-full bg-orange-50 px-2 py-1 text-orange-600">
                        {food.protein}
                      </span>
                    </div>

                    {/* Why Recommended */}
                    <div className="mt-4 rounded-xl bg-orange-50 p-3">
                      <p className="text-xs font-semibold text-orange-700">
                        ✨ Why I recommend this
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-600">
                        Matches your budget, spicy food preference,
                        and high-protein requirement.
                      </p>
                    </div>

                    {/* Add to Cart */}
                    <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600">
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AIAssistant;