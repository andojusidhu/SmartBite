const Food = require("../models/Food");

const aiRecommend = async (req, res) => {
  try {
    const { query } = req.body;

    // =========================
    // 1. VALIDATE QUERY
    // =========================

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter what you are looking for",
      });
    }

    const searchText = query.toLowerCase().trim();

    // =========================
    // 2. DETECT BUDGET
    // =========================

    let maxPrice = null;

    const priceMatch = searchText.match(
      /(?:under|below|within|less than|max|upto|up to)\s*₹?\s*(\d+)/
    );

    if (priceMatch) {
      maxPrice = Number(priceMatch[1]);
    }

    // =========================
    // 3. DETECT FOOD PREFERENCES
    // =========================

    const preferences = {
      chicken: false,
      mutton: false,
      fish: false,
      prawn: false,
      paneer: false,
      biryani: false,
      pizza: false,
      burger: false,
      spicy: false,
      sweet: false,
      dessert: false,
      healthy: false,
      protein: false,
      vegetarian: false,
      nonVegetarian: false,
    };

    // =========================
    // MEAT / FOOD DETECTION
    // =========================

    if (searchText.includes("chicken")) {
      preferences.chicken = true;
    }

    if (
      searchText.includes("mutton") ||
      searchText.includes("lamb")
    ) {
      preferences.mutton = true;
    }

    if (
      searchText.includes("fish") ||
      searchText.includes("seafood")
    ) {
      preferences.fish = true;
    }

    if (
      searchText.includes("prawn") ||
      searchText.includes("prawns") ||
      searchText.includes("shrimp")
    ) {
      preferences.prawn = true;
    }

    if (searchText.includes("paneer")) {
      preferences.paneer = true;
    }

    // =========================
    // FOOD TYPE DETECTION
    // =========================

    if (searchText.includes("biryani")) {
      preferences.biryani = true;
    }

    if (searchText.includes("pizza")) {
      preferences.pizza = true;
    }

    if (searchText.includes("burger")) {
      preferences.burger = true;
    }

    // =========================
    // TASTE DETECTION
    // =========================

    if (
      searchText.includes("spicy") ||
      searchText.includes("hot") ||
      searchText.includes("masala")
    ) {
      preferences.spicy = true;
    }

    if (
      searchText.includes("sweet") ||
      searchText.includes("sweets")
    ) {
      preferences.sweet = true;
    }

    if (
      searchText.includes("dessert") ||
      searchText.includes("desserts")
    ) {
      preferences.dessert = true;
    }

    // =========================
    // HEALTH DETECTION
    // =========================

    if (
      searchText.includes("healthy") ||
      searchText.includes("health") ||
      searchText.includes("low calorie") ||
      searchText.includes("low-calorie")
    ) {
      preferences.healthy = true;
    }

    if (
      searchText.includes("protein") ||
      searchText.includes("high protein") ||
      searchText.includes("high-protein")
    ) {
      preferences.protein = true;
    }

    // =========================
    // DIET DETECTION
    // =========================

    if (
      searchText.includes("vegetarian") ||
      searchText.includes("veg")
    ) {
      preferences.vegetarian = true;
    }

    if (
      searchText.includes("non veg") ||
      searchText.includes("non-veg") ||
      searchText.includes("nonvegetarian")
    ) {
      preferences.nonVegetarian = true;
    }

    // =========================
    // 4. DETECT CUISINES
    // =========================

    const cuisines = [
      "indian",
      "italian",
      "chinese",
      "mexican",
      "korean",
      "continental",
      "south indian",
      "north indian",
      "hyderabadi",
    ];

    const matchedCuisines = cuisines.filter((cuisine) =>
      searchText.includes(cuisine)
    );

    // =========================
    // 5. BUILD DATABASE QUERY
    // =========================

    const mongoQuery = {
      isAvailable: true,
    };

    // Budget
    if (maxPrice !== null) {
      mongoQuery.price = {
        $lte: maxPrice,
      };
    }

    // Vegetarian
    if (preferences.vegetarian) {
      mongoQuery.isVeg = true;
    }

    // Non Vegetarian
    if (preferences.nonVegetarian) {
      mongoQuery.isVeg = false;
    }

    // =========================
    // 6. GET FOODS
    // =========================

    let foods = await Food.find(mongoQuery)
      .populate("restaurant", "name")
      .lean();

    // =========================
    // 7. SCORE FOODS
    // =========================

    foods = foods.map((food) => {
      let score = 0;

      const foodName = (
        food.name || ""
      ).toLowerCase();

      const foodDescription = (
        food.description || ""
      ).toLowerCase();

      const foodCuisine = (
        food.cuisine || ""
      ).toLowerCase();

      const foodCategory = (
        food.category || ""
      ).toLowerCase();

      const foodTags = (
        food.tags || []
      ).map((tag) =>
        String(tag).toLowerCase()
      );

      const searchableText = [
        foodName,
        foodDescription,
        foodCuisine,
        foodCategory,
        ...foodTags,
      ].join(" ");

      // =========================
      // FOOD MATCHING
      // =========================

      if (
        preferences.chicken &&
        searchableText.includes("chicken")
      ) {
        score += 10;
      }

      if (
        preferences.mutton &&
        searchableText.includes("mutton")
      ) {
        score += 10;
      }

      if (
        preferences.fish &&
        searchableText.includes("fish")
      ) {
        score += 10;
      }

      if (
        preferences.prawn &&
        (
          searchableText.includes("prawn") ||
          searchableText.includes("shrimp")
        )
      ) {
        score += 10;
      }

      if (
        preferences.paneer &&
        searchableText.includes("paneer")
      ) {
        score += 10;
      }

      // =========================
      // FOOD TYPE
      // =========================

      if (
        preferences.biryani &&
        searchableText.includes("biryani")
      ) {
        score += 10;
      }

      if (
        preferences.pizza &&
        searchableText.includes("pizza")
      ) {
        score += 10;
      }

      if (
        preferences.burger &&
        searchableText.includes("burger")
      ) {
        score += 10;
      }

      // =========================
      // SPICY
      // =========================

      if (preferences.spicy) {
        if (
          searchableText.includes("spicy") ||
          searchableText.includes("hot") ||
          searchableText.includes("masala")
        ) {
          score += 8;
        }

        if (foodTags.includes("spicy")) {
          score += 5;
        }
      }

      // =========================
      // SWEET / DESSERT
      // =========================

      if (
        preferences.sweet &&
        (
          searchableText.includes("sweet") ||
          searchableText.includes("dessert")
        )
      ) {
        score += 8;
      }

      if (
        preferences.dessert &&
        (
          searchableText.includes("dessert") ||
          foodCategory.includes("dessert")
        )
      ) {
        score += 10;
      }

      // =========================
      // HEALTHY
      // =========================

      if (preferences.healthy) {
        if (
          searchableText.includes("healthy") ||
          searchableText.includes("salad") ||
          searchableText.includes("grilled") ||
          searchableText.includes("low calorie")
        ) {
          score += 8;
        }

        if (foodTags.includes("healthy")) {
          score += 5;
        }
      }

      // =========================
      // PROTEIN
      // =========================

      if (preferences.protein) {
        if (
          searchableText.includes("chicken") ||
          searchableText.includes("fish") ||
          searchableText.includes("mutton") ||
          searchableText.includes("prawn") ||
          searchableText.includes("paneer") ||
          searchableText.includes("egg")
        ) {
          score += 8;
        }

        if (
          foodTags.includes("protein") ||
          foodTags.includes("high-protein")
        ) {
          score += 5;
        }
      }

      // =========================
      // CUISINE
      // =========================

      matchedCuisines.forEach((cuisine) => {
        if (foodCuisine.includes(cuisine)) {
          score += 10;
        }
      });

      // =========================
      // RATING BONUS
      // =========================

      score += (food.rating || 0) * 2;

      return {
        ...food,
        aiScore: score,
      };
    });

    // =========================
    // 8. SORT BY AI SCORE
    // =========================

    foods.sort((a, b) => {
      return b.aiScore - a.aiScore;
    });

    // =========================
    // 9. REMOVE ZERO MATCHES
    // =========================

    const hasPreferences =
      Object.values(preferences).some(
        (value) => value === true
      ) ||
      matchedCuisines.length > 0;

    if (hasPreferences) {
      const matchedFoods = foods.filter(
        (food) => food.aiScore > 8
      );

      if (matchedFoods.length > 0) {
        foods = matchedFoods;
      }
    }

    // =========================
    // 10. LIMIT RESULTS
    // =========================

    foods = foods.slice(0, 10);

    // =========================
    // 11. RESPONSE
    // =========================

    res.status(200).json({
      success: true,

      query,

      detectedBudget: maxPrice,

      preferences,

      matchedCuisines,

      recommendations: foods,
    });
  } catch (error) {
    console.error(
      "AI Recommendation Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to process AI recommendation",
    });
  }
};

module.exports = {
  aiRecommend,
};