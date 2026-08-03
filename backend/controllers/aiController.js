const Groq = require("groq-sdk");

const Food = require("../models/Food");
const Order = require("../models/Order");
const User = require("../models/User");

// =========================
// INITIALIZE GROQ
// =========================

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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

    // =========================
    // 2. CHECK GROQ API KEY
    // =========================

    if (!process.env.GROQ_API_KEY) {
      console.error(
        "GROQ_API_KEY is missing"
      );

      return res.status(500).json({
        success: false,
        message:
          "Groq API key is not configured on the server",
      });
    }

    // =========================
    // 3. GET LOGGED-IN USER
    // =========================

    let user = null;
    let orders = [];

    if (req.user?._id) {
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
        .sort({
          createdAt: -1,
        })
        .limit(20)
        .lean();
    }

    // =========================
    // 4. CREATE ORDER HISTORY
    // =========================

    const orderHistory = [];

    orders.forEach((order) => {
      if (!order.items) {
        return;
      }

      order.items.forEach((item) => {
        if (item.food) {
          orderHistory.push({
            name:
              item.food.name || "",

            cuisine:
              item.food.cuisine || "",

            category:
              item.food.category || "",

            tags:
              item.food.tags || [],

            price:
              item.food.price || 0,

            isVeg:
              item.food.isVeg,
          });
        }
      });
    });

    // =========================
    // 5. GET AVAILABLE FOODS
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
    // 6. CHECK FOOD AVAILABILITY
    // =========================

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
    // 7. CREATE FOOD DATA
    // =========================

    const foodData = foods.map(
      (food) => ({
        id:
          food._id.toString(),

        name:
          food.name || "",

        description:
          food.description || "",

        price:
          food.price || 0,

        category:
          food.category || "",

        cuisine:
          food.cuisine || "",

        tags:
          food.tags || [],

        isVeg:
          food.isVeg,

        rating:
          food.rating || 0,

        restaurantId:
          food.restaurant?._id
            ?.toString() || null,

        restaurantName:
          food.restaurant?.name ||
          "",

        location:
          food.restaurant?.location ||
          "",

        deliveryTime:
          food.restaurant
            ?.deliveryTime || "",
      })
    );

    // =========================
    // 8. USER PROFILE
    // =========================

    const userProfile = user
      ? {
          name:
            user.name || "",

          location:
            user.location || "",

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

VERY IMPORTANT:

- The "id" must exactly match an "id" from AVAILABLE FOOD DATABASE.
- Do not modify, shorten, or generate IDs.
- Do not return any ID that is not present in AVAILABLE FOOD DATABASE.
- If a food does not match the user's request exactly, only recommend it as a fallback.
- For budget requests, NEVER recommend food above the user's maximum budget when possible.
- For vegetarian requests, prioritize vegetarian food.
- For non-vegetarian requests, prioritize non-vegetarian food.
- Always prioritize the user's current request over order history.

USER REQUEST:

${query}

USER PROFILE:

${JSON.stringify(
  userProfile
)}

USER PREVIOUS ORDER HISTORY:

${JSON.stringify(
  orderHistory
)}

AVAILABLE FOOD DATABASE:

${JSON.stringify(
  foodData
)}

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

    // =========================
    // 10. CALL GROQ AI
    // =========================

    const completion =
      await groq.chat.completions.create({
        model:
          "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",

            content:
              "You are SmartBite AI, an intelligent food recommendation system. Return only valid JSON. Never invent food IDs.",
          },

          {
            role: "user",

            content: prompt,
          },
        ],

        temperature: 0.2,

        max_tokens: 2000,

        response_format: {
          type: "json_object",
        },
      });

    // =========================
    // 11. GET GROQ RESPONSE
    // =========================

    const response =
      completion
        .choices?.[0]
        ?.message
        ?.content;

    if (!response) {
      return res.status(500).json({
        success: false,

        message:
          "Groq returned an empty response",
      });
    }

    // =========================
    // 12. PARSE GROQ RESPONSE
    // =========================

    let aiResult;

    try {
      aiResult =
        JSON.parse(response);

    } catch (parseError) {
      console.error(
        "Groq JSON Parse Error:",
        parseError.message
      );

      return res.status(500).json({
        success: false,

        message:
          "AI returned an invalid JSON response",

        error:
          parseError.message,
      });
    }

    // =========================
    // 13. VALIDATE AI RESPONSE
    // =========================

    if (
      !aiResult ||
      !Array.isArray(
        aiResult.recommendations
      )
    ) {
      console.error(
        "Invalid AI result format"
      );

      return res.status(500).json({
        success: false,

        message:
          "AI returned an invalid recommendation format",
      });
    }

    // =========================
    // 14. CREATE FOOD MAP
    // =========================

    const foodMap =
      new Map();

    foods.forEach((food) => {
      foodMap.set(
        food._id.toString(),
        food
      );
    });

    // =========================
    // 15. MAP AI RESULTS
    // =========================

    const recommendations =
      aiResult.recommendations
        .slice(0, 10)
        .map((item) => {

          // Check ID
          if (!item.id) {
            return null;
          }

          // Find actual food
          // from database
          const food =
            foodMap.get(
              item.id.toString()
            );

          // Ignore invalid IDs
          if (!food) {
            console.error(
              "AI returned invalid food ID:",
              item.id
            );

            return null;
          }

          // Return actual
          // database food
          return {
            ...food,

            aiScore:
              Math.min(
                100,

                Math.max(
                  0,
                  Number(
                    item.score
                  ) || 0
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
    // 16. SEND RESPONSE
    // =========================

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
      "GROQ AI RECOMMENDATION ERROR"
    );

    console.error(
      "Message:",
      error.message
    );

    console.error(
      "Status:",
      error.status
    );

    console.error(
      "================================"
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to process AI recommendation",

      error:
        error.message,
    });
  }
};

// =========================
// EXPORT CONTROLLER
// =========================

module.exports = {
  aiRecommend,
};