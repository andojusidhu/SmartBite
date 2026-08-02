const { GoogleGenerativeAI } = require("@google/generative-ai");

const Food = require("../models/Food");
const Order = require("../models/Order");
const User = require("../models/User");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

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

    // =========================
    // 2. GET USER INFORMATION
    // =========================

    let user = null;
    let orders = [];

    // If user is logged in
    // req.user depends on your auth middleware

    if (req.user?._id) {
      user = await User.findById(
        req.user._id
      ).lean();

      orders = await Order.find({
        user: req.user._id,
      })
        .populate("items.food")
        .sort({ createdAt: -1 })
        .limit(20)
        .lean();
    }

    // =========================
    // 3. CREATE USER HISTORY
    // =========================

    const orderHistory = [];

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.food) {
          orderHistory.push({
            name: item.food.name,
            cuisine: item.food.cuisine,
            category: item.food.category,
            tags: item.food.tags,
            price: item.food.price,
            isVeg: item.food.isVeg,
          });
        }
      });
    });

    // =========================
    // 4. GET AVAILABLE FOODS
    // =========================

    const foods = await Food.find({
      isAvailable: true,
    })
      .populate(
        "restaurant",
        "name location rating deliveryTime"
      )
      .lean();

    // =========================
    // 5. CREATE FOOD DATA
    // =========================

    const foodData = foods.map((food) => ({
      id: food._id.toString(),

      name: food.name,

      description: food.description,

      price: food.price,

      category: food.category,

      cuisine: food.cuisine,

      tags: food.tags,

      isVeg: food.isVeg,

      rating: food.rating,

      restaurantId:
        food.restaurant?._id?.toString(),

      restaurantName:
        food.restaurant?.name || "",

      location:
        food.restaurant?.location || "",

      deliveryTime:
        food.restaurant?.deliveryTime || "",
    }));

    // =========================
    // 6. USER PROFILE
    // =========================

    const userProfile = user
      ? {
          name: user.name,

          location: user.location,

          favoriteCuisines:
            user.favoriteCuisines,

          dietaryPreference:
            user.dietaryPreference,

          healthGoal:
            user.healthGoal,
        }
      : {
          name: null,
          location: null,
          favoriteCuisines: [],
          dietaryPreference: "",
          healthGoal: "",
        };

    // =========================
    // 7. INITIALIZE GEMINI
    // =========================

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    // =========================
    // 8. LLM PROMPT
    // =========================

    const prompt = `
You are SmartBite AI, an intelligent food recommendation assistant.

Your job is to understand the user's natural language food request and recommend the best food items from the provided database.

IMPORTANT RULES:

1. Only recommend food items that exist in the provided database.
2. Never invent food items.
3. Consider the user's current request.
4. Consider the user's previous order history.
5. Consider the user's favorite cuisines.
6. Consider dietary preferences.
7. Consider health goals.
8. Consider budget if mentioned.
9. Consider food tags, cuisine, category, rating, and price.
10. Return a maximum of 10 recommendations.
11. Rank recommendations from best match to lowest match.
12. If the user asks for vegetarian food, prioritize isVeg=true.
13. If the user asks for non-vegetarian food, prioritize isVeg=false.
14. Use previous orders to understand the user's taste.
15. If there are no exact matches, return the closest available options.

USER REQUEST:

${query}

USER PROFILE:

${JSON.stringify(userProfile)}

USER ORDER HISTORY:

${JSON.stringify(orderHistory)}

AVAILABLE FOOD DATABASE:

${JSON.stringify(foodData)}

Return ONLY valid JSON.

The JSON format must be:

{
  "message": "A short natural language explanation of the recommendations",
  "recommendations": [
    {
      "id": "food_id",
      "reason": "Why this food is recommended",
      "score": 95
    }
  ]
}

The score must be between 0 and 100.
`;

    // =========================
    // 9. CALL GEMINI
    // =========================

    const result = await model.generateContent(
      prompt
    );

    const response =
      result.response.text();

    console.log(
      "Gemini Raw Response:",
      response
    );

    // =========================
    // 10. CLEAN AI RESPONSE
    // =========================

    let aiResult;

    try {
      const cleanedResponse = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      aiResult =
        JSON.parse(cleanedResponse);
    } catch (error) {
      console.error(
        "AI JSON Parse Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "AI returned an invalid response",
      });
    }

    // =========================
    // 11. MAP AI RESULTS
    // =========================

    const foodMap = new Map();

    foods.forEach((food) => {
      foodMap.set(
        food._id.toString(),
        food
      );
    });

    const recommendations =
      aiResult.recommendations
        .map((item) => {
          const food =
            foodMap.get(item.id);

          if (!food) {
            return null;
          }

          return {
            ...food,

            aiScore:
              item.score,

            aiReason:
              item.reason,

            restaurantName:
              food.restaurant?.name ||
              "SmartBite Restaurant",

            restaurantId:
              food.restaurant?._id,

            deliveryTime:
              food.restaurant
                ?.deliveryTime ||
              "30-40 min",
          };
        })
        .filter(Boolean);

    // =========================
    // 12. SEND RESPONSE
    // =========================

    res.status(200).json({
      success: true,

      query,

      message:
        aiResult.message ||
        "Here are my recommendations for you.",

      recommendations,
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

      error:
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined,
    });
  }
};

module.exports = {
  aiRecommend,
};