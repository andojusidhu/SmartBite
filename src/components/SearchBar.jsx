import React, { useState } from "react";
import { Sparkles, Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const suggestions = [
    "Spicy food under ₹300",
    "High protein meals",
    "Best vegetarian food",
  ];

  const handleSearch = () => {
    if (!query.trim()) return;
    console.log("AI Query:", query);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-xl sm:flex-row">
        <div className="flex flex-1 items-center gap-3 px-3">
          <Sparkles className="text-orange-500" size={22} />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tell me what you're craving..."
            className="w-full bg-transparent py-3 text-gray-800 outline-none placeholder:text-gray-400"
          />
        </div>

        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg"
        >
          <Search size={18} />
          Find My Food
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setQuery(suggestion)}
            className="rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm text-orange-700 transition hover:border-orange-500 hover:bg-orange-50"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;