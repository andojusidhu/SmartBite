const { GoogleGenerativeAI } = require("@google/generative-ai");

const Food = require("../models/Food");
const Order = require("../models/Order");
const User = require("../models/User");

// =========================
// INITIALIZE GEMINI
// =========================

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

// =========================
// AI RECOMMENDATION
// =========================

const aiRecommend = async (req, res) => {
  try {
    // =========================
    // 1. GET QUERY
    // =========================

    const { query } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter what you are looking for",
      });
    }

    console.log("AI Query:", query);

    // =========================
    // 2. GET LOGGED-IN USER
    // =========================

    let user = null;
    let orders = [];

    // authMiddleware sets:
    // req.user = user

    if (req.user?._id) {
      console.log(
        "Logged in User ID:",
        req.user._id.toString()
      );

      user = await User.findById(
        req.user._id
      ).lean();

      // =========================
      // GET USER ORDER HISTORY
      // =========================

      orders = await Order.find({
        user: req.user._id,
      })
        .populate("items.food")
        .sort({ createdAt: -1 })
        .limit(20)
        .lean();

      console.log(
        "Orders Found:",
        orders.length
      );
    }

    // =========================
    // 3. CREATE ORDER HISTORY
    // =========================

    const orderHistory = [];

    orders.forEach((order) => {
      if (!order.items) return;

      order.items.forEach((item) => {
        if (item.food) {
          orderHistory.push({
            name: item.food.name,
            cuisine: item.food.cuisine,
            category: item.food.category,
            tags: item.food.tags || [],
            price: item.food.price,
            isVeg: item.food.isVeg,
          });
        }
      });
    });

    console.log(
      "Order History Items:",
      orderHistory.length
    );

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

    console.log(
      "Available Foods:",
      foods.length
    );

    if (foods.length === 0) {
      return res.status(200).json({
        success: true,
        query,
        message:
          "Sorry, there are no food items available right now.",
        recommendations: [],
      });
    }

    // =========================
    // 5. CREATE FOOD DATA
    // =========================

    const foodData = foods.map((food) => ({
      id: food._id.toString(),

      name: food.name,

      description: food.description || "",

      price: food.price,

      category: food.category,

      cuisine: food.cuisine,

      tags: food.tags || [],

      isVeg: food.isVeg,

      rating: food.rating,

      restaurantId:
        food.restaurant?._id?.toString() || null,

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
          name: user.name || "",

          location: user.location || "",

          favoriteCuisines:
            user.favoriteCuisines || [],

          dietaryPreference:
            user.dietaryPreference || "",

          healthGoal:
            user.healthGoal || "",
        }
      : {
          name: null,

          location: null,

          favoriteCuisines: [],

          dietaryPreference: "",

          healthGoal: "",
        };

    // =========================
    // 7. CHECK GEMINI API KEY
    // =========================

    if (!process.env.GEMINI_API_KEY) {
      console.error(
        "GEMINI_API_KEY is missing"
      );

      return res.status(500).json({
        success: false,
        message:
          "Gemini API key is not configured on the server",
      });
    }

    // =========================
    // 8. INITIALIZE GEMINI MODEL
    // =========================

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.3,
        responseMimeType: "application/json",
      },
    });

    // =========================
    // 9. CREATE AI PROMPT
    // =========================

    const prompt = `
You are SmartBite AI, an intelligent personalized food recommendation assistant.

Your job is to understand the user's natural language request and recommend the best matching food items from the provided database.

IMPORTANT RULES:

1. ONLY recommend food items that exist in AVAILABLE FOOD DATABASE.
2. NEVER invent a food item.
3. NEVER create fake food IDs.
4. Use the exact "id" provided in the food database.
5. Consider the user's current request first.
6. Consider the user's previous order history.
7. Consider the user's favorite cuisines.
8. Consider dietary preferences.
9. Consider health goals.
10. Consider budget if mentioned.
11. Consider food tags.
12. Consider cuisine.
13. Consider category.
14. Consider rating.
15. Consider price.
16. Consider restaurant location when relevant.
17. Consider delivery time when relevant.
18. Return a maximum of 10 recommendations.
19. Rank recommendations from best match to lowest match.
20. If the user asks for vegetarian food, prioritize isVeg=true.
21. If the user asks for non-vegetarian food, prioritize isVeg=false.
22. If there are no exact matches, return the closest available options.
23. The score must be between 0 and 100.
24. Return ONLY valid JSON.
25. Do not use Markdown.
26. Do not use code fences.

USER REQUEST:

${query}

USER PROFILE:

${JSON.stringify(userProfile)}

USER PREVIOUS ORDER HISTORY:

${JSON.stringify(orderHistory)}

AVAILABLE FOOD DATABASE:

${JSON.stringify(foodData)}

Return exactly this JSON structure:

{
  "message": "Short natural language explanation of why these recommendations match the user",
  "recommendations": [
    {
      "id": "EXACT_FOOD_ID_FROM_DATABASE",
      "reason": "Why this food is a good match",
      "score": 95
    }
  ]
}
`;

    console.log(
      "Sending request to Gemini..."
    );

    // =========================
    // 10. CALL GEMINI
    // =========================

    const result =
      await model.generateContent(prompt);

    const response =
      result.response.text();

    console.log(
      "Gemini Raw Response:",
      response
    );

    // =========================
    // 11. PARSE GEMINI RESPONSE
    // =========================

    let aiResult;

    try {
      let cleanedResponse =
        response.trim();

      // Remove Markdown code fences
      cleanedResponse =
        cleanedResponse
          .replace(/^```json/i, "")
          .replace(/^```/i, "")
          .replace(/```$/i, "")
          .trim();

      aiResult =
        JSON.parse(cleanedResponse);

    } catch (parseError) {

      console.error(
        "AI JSON Parse Error:",
        parseError.message
      );

      console.error(
        "Gemini Response:",
        response
      );

      return res.status(500).json({
        success: false,
        message:
          "AI returned an invalid response",
        error:
          process.env.NODE_ENV ===
          "development"
            ? parseError.message
            : undefined,
      });
    }

    // =========================
    // 12. VALIDATE AI RESPONSE
    // =========================

    if (
      !aiResult ||
      !Array.isArray(
        aiResult.recommendations
      )
    ) {
      console.error(
        "Invalid AI result:",
        aiResult
      );

      return res.status(500).json({
        success: false,
        message:
          "AI returned an invalid recommendation format",
      });
    }

    // =========================
    // 13. CREATE FOOD MAP
    // =========================

    const foodMap = new Map();

    foods.forEach((food) => {
      foodMap.set(
        food._id.toString(),
        food
      );
    });

    // =========================
    // 14. MAP AI RESULTS
    // =========================

    const recommendations =
      aiResult.recommendations
        .slice(0, 10)
        .map((item) => {

          if (!item.id) {
            return null;
          }

          const food =
            foodMap.get(
              item.id.toString()
            );

          // Ignore fake or invalid IDs
          if (!food) {
            console.warn(
              "AI recommended invalid food ID:",
              item.id
            );

            return null;
          }

          return {
            ...food,

            aiScore:
              Math.min(
                100,
                Math.max(
                  0,
                  Number(item.score) || 0
                )
              ),

            aiReason:
              item.reason ||
              "Recommended based on your preferences.",

            restaurantName:
              food.restaurant?.name ||
              "SmartBite Restaurant",

            restaurantId:
              food.restaurant?._id ||
              null,

            deliveryTime:
              food.restaurant
                ?.deliveryTime ||
              "30-40 min",
          };
        })
        .filter(Boolean);

    // =========================
    // 15. SEND RESPONSE
    // =========================

    console.log(
      "Final Recommendations:",
      recommendations.length
    );

    return res.status(200).json({
      success: true,

      query,

      message:
        aiResult.message ||
        "Here are my personalized recommendations for you.",

      recommendations,
    });

  } catch (error) {

    // =========================
    // GLOBAL ERROR
    // =========================

    console.error(
      "================================"
    );

    console.error(
      "AI RECOMMENDATION ERROR"
    );

    console.error(
      "Message:",
      error.message
    );

    console.error(
      "Stack:",
      error.stack
    );

    console.error(
      "================================"
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to process AI recommendation",

      // Shows actual error for debugging
      error: error.message,
    });
  }
};

module.exports = {
  aiRecommend,
};