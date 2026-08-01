const Food = require("../models/Food");
const Order = require("../models/Order");

const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's previous orders
    const orders = await Order.find({
      user: userId,
    });

    // No previous orders
    if (orders.length === 0) {
      const popularFoods = await Food.find({
        isAvailable: true,
      })
        .sort({
          rating: -1,
        })
        .limit(10);

      return res.json({
        success: true,
        type: "popular",
        preferredCuisines: [],
        preferredTags: [],
        recommendations: popularFoods,
      });
    }

    // Collect ordered food IDs
    const orderedFoodIds = [];

    // Collect cuisines
    const cuisineCount = {};

    // Collect tags
    const tagCount = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.food) {
          orderedFoodIds.push(item.food.toString());
        }
      });
    });

    // Get previous ordered food details
    const orderedFoods = await Food.find({
      _id: {
        $in: orderedFoodIds,
      },
    });

    orderedFoods.forEach((food) => {
      // Cuisine preference
      if (food.cuisine) {
        cuisineCount[food.cuisine] =
          (cuisineCount[food.cuisine] || 0) + 1;
      }

      // Tag preference
      if (food.tags && food.tags.length > 0) {
        food.tags.forEach((tag) => {
          tagCount[tag] =
            (tagCount[tag] || 0) + 1;
        });
      }
    });

    // Get top cuisines
    const preferredCuisines = Object.entries(
      cuisineCount
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cuisine]) => cuisine);

    // Get top tags
    const preferredTags = Object.entries(
      tagCount
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag]) => tag);

    // Find personalized recommendations
    let recommendations = await Food.find({
      isAvailable: true,

      // Don't recommend already ordered food
      _id: {
        $nin: orderedFoodIds,
      },

      $or: [
        {
          cuisine: {
            $in: preferredCuisines,
          },
        },
        {
          tags: {
            $in: preferredTags,
          },
        },
      ],
    })
      .sort({
        rating: -1,
      })
      .limit(10);

    // FALLBACK
    // If no personalized food is found,
    // show popular food instead
    if (recommendations.length === 0) {
      recommendations = await Food.find({
        isAvailable: true,
      })
        .sort({
          rating: -1,
        })
        .limit(10);
    }

    res.json({
      success: true,
      type:
        recommendations.length > 0
          ? "personalized"
          : "popular",

      preferredCuisines,
      preferredTags,

      recommendations,
    });
  } catch (error) {
    console.error(
      "Recommendation Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch recommendations",
    });
  }
};

module.exports = {
  getRecommendations,
};