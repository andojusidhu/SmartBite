const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");

dotenv.config();

// ================================
// MongoDB Connection
// ================================

const MONGO_URI = process.env.MONGO_URI;

// ================================
// Restaurants
// ================================

const restaurants = [
  {
    name: "Spice Garden",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
    cuisine: ["Indian", "North Indian"],
    rating: 4.7,
    deliveryTime: "25-30 min",
    deliveryFee: 40,
    location: "Madhapur, Hyderabad",
    isOpen: true,
  },

  {
    name: "Biryani House",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=80",
    cuisine: ["Indian", "Hyderabadi"],
    rating: 4.8,
    deliveryTime: "30-35 min",
    deliveryFee: 30,
    location: "Kukatpally, Hyderabad",
    isOpen: true,
  },

  {
    name: "Urban Bites",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1000&q=80",
    cuisine: ["Burgers", "Fast Food"],
    rating: 4.5,
    deliveryTime: "20-25 min",
    deliveryFee: 25,
    location: "Gachibowli, Hyderabad",
    isOpen: true,
  },

  {
    name: "Healthy Bites",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80",
    cuisine: ["Healthy", "Vegetarian"],
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: 20,
    location: "Hitech City, Hyderabad",
    isOpen: true,
  },

  {
    name: "Pizza Paradise",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
    cuisine: ["Pizza", "Italian"],
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 35,
    location: "Banjara Hills, Hyderabad",
    isOpen: true,
  },

  {
    name: "Chinese Wok",
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1000&q=80",
    cuisine: ["Chinese", "Asian"],
    rating: 4.4,
    deliveryTime: "25-30 min",
    deliveryFee: 30,
    location: "Jubilee Hills, Hyderabad",
    isOpen: true,
  },

  {
    name: "Burger Hub",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
    cuisine: ["Burgers", "Fast Food"],
    rating: 4.5,
    deliveryTime: "20-25 min",
    deliveryFee: 20,
    location: "Miyapur, Hyderabad",
    isOpen: true,
  },

  {
    name: "South Spice",
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80",
    cuisine: ["South Indian", "Indian"],
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 15,
    location: "Secunderabad, Hyderabad",
    isOpen: true,
  },

  {
    name: "Sweet Treats",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1000&q=80",
    cuisine: ["Desserts", "Bakery"],
    rating: 4.6,
    deliveryTime: "20-25 min",
    deliveryFee: 20,
    location: "Begumpet, Hyderabad",
    isOpen: true,
  },

  {
    name: "Tandoori Tales",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80",
    cuisine: ["Indian", "Tandoori"],
    rating: 4.7,
    deliveryTime: "30-35 min",
    deliveryFee: 35,
    location: "Ameerpet, Hyderabad",
    isOpen: true,
  },
];

// ================================
// Seed Database
// ================================

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected");

    // Clear old data
    await Food.deleteMany({});
    await Restaurant.deleteMany({});

    console.log("Old restaurants and food deleted");

    // Insert restaurants
    const createdRestaurants =
      await Restaurant.insertMany(restaurants);

    console.log(
      `${createdRestaurants.length} restaurants inserted`
    );

    // ================================
    // Food Data
    // ================================

    const foodData = [

      // =====================================
      // 1. Spice Garden
      // =====================================

      {
        restaurant: createdRestaurants[0]._id,
        name: "Chicken Tikka",
        description: "Juicy grilled chicken tikka with Indian spices.",
        image:
          "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
        price: 249,
        category: "Starters",
        cuisine: "Indian",
        tags: ["spicy", "chicken", "high-protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.7,
      },

      {
        restaurant: createdRestaurants[0]._id,
        name: "Paneer Tikka",
        description: "Soft paneer grilled with aromatic spices.",
        image:
          "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
        price: 199,
        category: "Starters",
        cuisine: "Indian",
        tags: ["spicy", "veg", "protein"],
        isVeg: true,
        isAvailable: true,
        rating: 4.6,
      },

      {
        restaurant: createdRestaurants[0]._id,
        name: "Butter Chicken",
        description: "Creamy tomato-based chicken curry.",
        image:
          "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
        price: 299,
        category: "Main Course",
        cuisine: "North Indian",
        tags: ["chicken", "spicy", "protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.8,
      },

      {
        restaurant: createdRestaurants[0]._id,
        name: "Dal Tadka",
        description: "Yellow lentils tempered with Indian spices.",
        image:
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
        price: 149,
        category: "Main Course",
        cuisine: "Indian",
        tags: ["veg", "healthy", "protein"],
        isVeg: true,
        isAvailable: true,
        rating: 4.5,
      },

      {
        restaurant: createdRestaurants[0]._id,
        name: "Chicken Biryani",
        description: "Aromatic Hyderabadi-style chicken biryani.",
        image:
          "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=800&q=80",
        price: 249,
        category: "Biryani",
        cuisine: "Indian",
        tags: ["chicken", "spicy", "biryani", "high-protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.9,
      },

      // =====================================
      // 2. Biryani House
      // =====================================

      {
        restaurant: createdRestaurants[1]._id,
        name: "Mutton Biryani",
        description: "Rich and flavorful mutton biryani.",
        image:
          "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=800&q=80",
        price: 349,
        category: "Biryani",
        cuisine: "Hyderabadi",
        tags: ["mutton", "spicy", "biryani", "protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.8,
      },

      {
        restaurant: createdRestaurants[1]._id,
        name: "Chicken Dum Biryani",
        description: "Slow-cooked chicken dum biryani.",
        image:
          "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
        price: 279,
        category: "Biryani",
        cuisine: "Hyderabadi",
        tags: ["chicken", "spicy", "biryani"],
        isVeg: false,
        isAvailable: true,
        rating: 4.9,
      },

      {
        restaurant: createdRestaurants[1]._id,
        name: "Paneer Biryani",
        description: "Delicious vegetarian paneer biryani.",
        image:
          "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?auto=format&fit=crop&w=800&q=80",
        price: 229,
        category: "Biryani",
        cuisine: "Indian",
        tags: ["paneer", "veg", "biryani", "spicy"],
        isVeg: true,
        isAvailable: true,
        rating: 4.5,
      },

      {
        restaurant: createdRestaurants[1]._id,
        name: "Egg Biryani",
        description: "Spicy biryani served with boiled eggs.",
        image:
          "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?auto=format&fit=crop&w=800&q=80",
        price: 199,
        category: "Biryani",
        cuisine: "Indian",
        tags: ["egg", "spicy", "biryani", "protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.4,
      },

      {
        restaurant: createdRestaurants[1]._id,
        name: "Chicken 65",
        description: "Crispy and spicy fried chicken.",
        image:
          "https://images.unsplash.com/photo-1608039755401-742486e9a2c6?auto=format&fit=crop&w=800&q=80",
        price: 219,
        category: "Starters",
        cuisine: "Indian",
        tags: ["chicken", "spicy", "protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.7,
      },

      // =====================================
      // 3. Urban Bites
      // =====================================

      {
        restaurant: createdRestaurants[2]._id,
        name: "Classic Chicken Burger",
        description: "Juicy chicken burger with fresh vegetables.",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
        price: 199,
        category: "Burgers",
        cuisine: "Fast Food",
        tags: ["chicken", "burger", "protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.6,
      },

      {
        restaurant: createdRestaurants[2]._id,
        name: "Veg Cheese Burger",
        description: "Crispy veg patty with melted cheese.",
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
        price: 159,
        category: "Burgers",
        cuisine: "Fast Food",
        tags: ["veg", "burger"],
        isVeg: true,
        isAvailable: true,
        rating: 4.4,
      },

      {
        restaurant: createdRestaurants[2]._id,
        name: "Spicy Chicken Burger",
        description: "Hot and spicy crispy chicken burger.",
        image:
          "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80",
        price: 229,
        category: "Burgers",
        cuisine: "Fast Food",
        tags: ["spicy", "chicken", "burger"],
        isVeg: false,
        isAvailable: true,
        rating: 4.7,
      },

      {
        restaurant: createdRestaurants[2]._id,
        name: "French Fries",
        description: "Crispy golden french fries.",
        image:
          "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
        price: 99,
        category: "Sides",
        cuisine: "Fast Food",
        tags: ["veg"],
        isVeg: true,
        isAvailable: true,
        rating: 4.3,
      },

      {
        restaurant: createdRestaurants[2]._id,
        name: "Chicken Nuggets",
        description: "Crispy golden chicken nuggets.",
        image:
          "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=800&q=80",
        price: 179,
        category: "Starters",
        cuisine: "Fast Food",
        tags: ["chicken", "protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.5,
      },

      // =====================================
      // 4. Healthy Bites
      // =====================================

      {
        restaurant: createdRestaurants[3]._id,
        name: "Chicken Protein Bowl",
        description: "Healthy bowl with grilled chicken and vegetables.",
        image:
          "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
        price: 249,
        category: "Healthy",
        cuisine: "Healthy",
        tags: ["healthy", "high-protein", "chicken"],
        isVeg: false,
        isAvailable: true,
        rating: 4.8,
      },

      {
        restaurant: createdRestaurants[3]._id,
        name: "Paneer Protein Bowl",
        description: "Protein-rich paneer bowl with fresh vegetables.",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
        price: 229,
        category: "Healthy",
        cuisine: "Healthy",
        tags: ["healthy", "high-protein", "paneer", "veg"],
        isVeg: true,
        isAvailable: true,
        rating: 4.7,
      },

      {
        restaurant: createdRestaurants[3]._id,
        name: "Grilled Chicken Salad",
        description: "Fresh salad with grilled chicken.",
        image:
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80",
        price: 219,
        category: "Salads",
        cuisine: "Healthy",
        tags: ["healthy", "chicken", "protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.6,
      },

      {
        restaurant: createdRestaurants[3]._id,
        name: "Veggie Salad Bowl",
        description: "Fresh vegetables and greens.",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
        price: 179,
        category: "Salads",
        cuisine: "Healthy",
        tags: ["healthy", "veg"],
        isVeg: true,
        isAvailable: true,
        rating: 4.5,
      },

      {
        restaurant: createdRestaurants[3]._id,
        name: "Egg Protein Bowl",
        description: "Boiled eggs with vegetables and healthy grains.",
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
        price: 199,
        category: "Healthy",
        cuisine: "Healthy",
        tags: ["healthy", "protein", "high-protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.6,
      },

      // =====================================
      // 5. Pizza Paradise
      // =====================================

      {
        restaurant: createdRestaurants[4]._id,
        name: "Margherita Pizza",
        description: "Classic cheese and tomato pizza.",
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
        price: 249,
        category: "Pizza",
        cuisine: "Italian",
        tags: ["veg", "pizza"],
        isVeg: true,
        isAvailable: true,
        rating: 4.6,
      },

      {
        restaurant: createdRestaurants[4]._id,
        name: "Chicken Pepperoni Pizza",
        description: "Loaded pizza with chicken pepperoni.",
        image:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
        price: 349,
        category: "Pizza",
        cuisine: "Italian",
        tags: ["chicken", "pizza", "protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.8,
      },

      {
        restaurant: createdRestaurants[4]._id,
        name: "Farmhouse Pizza",
        description: "Fresh vegetables and cheese on a crispy crust.",
        image:
          "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80",
        price: 299,
        category: "Pizza",
        cuisine: "Italian",
        tags: ["veg", "pizza", "healthy"],
        isVeg: true,
        isAvailable: true,
        rating: 4.5,
      },

      {
        restaurant: createdRestaurants[4]._id,
        name: "Spicy Chicken Pizza",
        description: "Hot spicy chicken pizza with jalapenos.",
        image:
          "https://images.unsplash.com/photo-1593560708920-61dd98c8c9a5?auto=format&fit=crop&w=800&q=80",
        price: 329,
        category: "Pizza",
        cuisine: "Italian",
        tags: ["spicy", "chicken", "pizza"],
        isVeg: false,
        isAvailable: true,
        rating: 4.7,
      },

      {
        restaurant: createdRestaurants[4]._id,
        name: "Cheese Burst Pizza",
        description: "Extra cheesy pizza for cheese lovers.",
        image:
          "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80",
        price: 319,
        category: "Pizza",
        cuisine: "Italian",
        tags: ["veg", "pizza"],
        isVeg: true,
        isAvailable: true,
        rating: 4.6,
      },

      // =====================================
      // 6. Chinese Wok
      // =====================================

      {
        restaurant: createdRestaurants[5]._id,
        name: "Chicken Fried Rice",
        description: "Wok-fried rice with chicken and vegetables.",
        image:
          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
        price: 199,
        category: "Rice",
        cuisine: "Chinese",
        tags: ["chicken", "spicy", "protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.6,
      },

      {
        restaurant: createdRestaurants[5]._id,
        name: "Veg Hakka Noodles",
        description: "Classic Chinese-style vegetable noodles.",
        image:
          "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
        price: 169,
        category: "Noodles",
        cuisine: "Chinese",
        tags: ["veg", "spicy"],
        isVeg: true,
        isAvailable: true,
        rating: 4.5,
      },

      {
        restaurant: createdRestaurants[5]._id,
        name: "Chicken Manchurian",
        description: "Spicy chicken balls in Manchurian sauce.",
        image:
          "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
        price: 229,
        category: "Starters",
        cuisine: "Chinese",
        tags: ["chicken", "spicy", "protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.7,
      },

      {
        restaurant: createdRestaurants[5]._id,
        name: "Veg Manchurian",
        description: "Crispy vegetable balls in spicy sauce.",
        image:
          "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
        price: 179,
        category: "Starters",
        cuisine: "Chinese",
        tags: ["veg", "spicy"],
        isVeg: true,
        isAvailable: true,
        rating: 4.4,
      },

      {
        restaurant: createdRestaurants[5]._id,
        name: "Schezwan Chicken",
        description: "Spicy chicken tossed in Schezwan sauce.",
        image:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
        price: 249,
        category: "Main Course",
        cuisine: "Chinese",
        tags: ["chicken", "spicy", "protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.7,
      },

      // =====================================
      // 7. Burger Hub
      // =====================================

      {
        restaurant: createdRestaurants[6]._id,
        name: "Double Chicken Burger",
        description: "Double chicken patty burger with cheese.",
        image:
          "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80",
        price: 279,
        category: "Burgers",
        cuisine: "Fast Food",
        tags: ["chicken", "burger", "high-protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.8,
      },

      {
        restaurant: createdRestaurants[6]._id,
        name: "Crispy Chicken Burger",
        description: "Crispy fried chicken burger.",
        image:
          "https://images.unsplash.com/photo-1615297928064-24977384d0a1?auto=format&fit=crop&w=800&q=80",
        price: 219,
        category: "Burgers",
        cuisine: "Fast Food",
        tags: ["chicken", "burger", "spicy"],
        isVeg: false,
        isAvailable: true,
        rating: 4.6,
      },

      {
        restaurant: createdRestaurants[6]._id,
        name: "Veggie Burger",
        description: "Fresh vegetable patty burger.",
        image:
          "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80",
        price: 149,
        category: "Burgers",
        cuisine: "Fast Food",
        tags: ["veg", "healthy", "burger"],
        isVeg: true,
        isAvailable: true,
        rating: 4.4,
      },

      {
        restaurant: createdRestaurants[6]._id,
        name: "Spicy Chicken Wings",
        description: "Hot and spicy chicken wings.",
        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80",
        price: 229,
        category: "Starters",
        cuisine: "Fast Food",
        tags: ["chicken", "spicy", "protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.7,
      },

      {
        restaurant: createdRestaurants[6]._id,
        name: "Cheese Fries",
        description: "Crispy fries loaded with cheese.",
        image:
          "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80",
        price: 139,
        category: "Sides",
        cuisine: "Fast Food",
        tags: ["veg"],
        isVeg: true,
        isAvailable: true,
        rating: 4.5,
      },

      // =====================================
      // 8. South Spice
      // =====================================

      {
        restaurant: createdRestaurants[7]._id,
        name: "Masala Dosa",
        description: "Crispy dosa filled with spicy potato masala.",
        image:
          "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        price: 99,
        category: "South Indian",
        cuisine: "South Indian",
        tags: ["veg", "spicy"],
        isVeg: true,
        isAvailable: true,
        rating: 4.8,
      },

      {
        restaurant: createdRestaurants[7]._id,
        name: "Idli Sambar",
        description: "Soft idlis served with hot sambar.",
        image:
          "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80",
        price: 79,
        category: "South Indian",
        cuisine: "South Indian",
        tags: ["veg", "healthy"],
        isVeg: true,
        isAvailable: true,
        rating: 4.6,
      },

      {
        restaurant: createdRestaurants[7]._id,
        name: "Paneer Dosa",
        description: "Crispy dosa filled with spicy paneer.",
        image:
          "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        price: 149,
        category: "South Indian",
        cuisine: "South Indian",
        tags: ["veg", "paneer", "protein", "spicy"],
        isVeg: true,
        isAvailable: true,
        rating: 4.5,
      },

      {
        restaurant: createdRestaurants[7]._id,
        name: "Chicken Dosa",
        description: "South Indian dosa with spicy chicken filling.",
        image:
          "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80",
        price: 199,
        category: "South Indian",
        cuisine: "South Indian",
        tags: ["chicken", "spicy", "protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.6,
      },

      {
        restaurant: createdRestaurants[7]._id,
        name: "Medu Vada",
        description: "Crispy South Indian lentil fritters.",
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
        price: 89,
        category: "South Indian",
        cuisine: "South Indian",
        tags: ["veg", "protein"],
        isVeg: true,
        isAvailable: true,
        rating: 4.5,
      },

      // =====================================
      // 9. Sweet Treats
      // =====================================

      {
        restaurant: createdRestaurants[8]._id,
        name: "Chocolate Brownie",
        description: "Warm chocolate brownie with rich chocolate.",
        image:
          "https://images.unsplash.com/photo-1606313564200-e75d5e30476b?auto=format&fit=crop&w=800&q=80",
        price: 129,
        category: "Desserts",
        cuisine: "Desserts",
        tags: ["sweet", "dessert", "chocolate"],
        isVeg: true,
        isAvailable: true,
        rating: 4.7,
      },

      {
        restaurant: createdRestaurants[8]._id,
        name: "Gulab Jamun",
        description: "Soft and juicy Indian sweet.",
        image:
          "https://images.unsplash.com/photo-1666190094761-5d2a7f7b1d7e?auto=format&fit=crop&w=800&q=80",
        price: 99,
        category: "Desserts",
        cuisine: "Indian",
        tags: ["sweet", "dessert"],
        isVeg: true,
        isAvailable: true,
        rating: 4.6,
      },

      {
        restaurant: createdRestaurants[8]._id,
        name: "Chocolate Cake",
        description: "Moist and creamy chocolate cake.",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
        price: 179,
        category: "Desserts",
        cuisine: "Bakery",
        tags: ["sweet", "dessert", "chocolate"],
        isVeg: true,
        isAvailable: true,
        rating: 4.8,
      },

      {
        restaurant: createdRestaurants[8]._id,
        name: "Strawberry Cheesecake",
        description: "Creamy cheesecake with fresh strawberries.",
        image:
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
        price: 229,
        category: "Desserts",
        cuisine: "Bakery",
        tags: ["sweet", "dessert"],
        isVeg: true,
        isAvailable: true,
        rating: 4.7,
      },

      {
        restaurant: createdRestaurants[8]._id,
        name: "Ice Cream Sundae",
        description: "Classic ice cream with chocolate toppings.",
        image:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
        price: 149,
        category: "Desserts",
        cuisine: "Desserts",
        tags: ["sweet", "dessert"],
        isVeg: true,
        isAvailable: true,
        rating: 4.5,
      },

      // =====================================
      // 10. Tandoori Tales
      // =====================================

      {
        restaurant: createdRestaurants[9]._id,
        name: "Tandoori Chicken",
        description: "Traditional tandoori chicken grilled to perfection.",
        image:
          "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
        price: 299,
        category: "Tandoori",
        cuisine: "Indian",
        tags: ["chicken", "spicy", "high-protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.8,
      },

      {
        restaurant: createdRestaurants[9]._id,
        name: "Tandoori Paneer",
        description: "Grilled paneer with smoky tandoori flavors.",
        image:
          "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
        price: 249,
        category: "Tandoori",
        cuisine: "Indian",
        tags: ["paneer", "veg", "protein", "spicy"],
        isVeg: true,
        isAvailable: true,
        rating: 4.6,
      },

      {
        restaurant: createdRestaurants[9]._id,
        name: "Chicken Seekh Kebab",
        description: "Juicy minced chicken kebabs with spices.",
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
        price: 279,
        category: "Kebabs",
        cuisine: "Indian",
        tags: ["chicken", "spicy", "high-protein"],
        isVeg: false,
        isAvailable: true,
        rating: 4.8,
      },

      {
        restaurant: createdRestaurants[9]._id,
        name: "Paneer Malai Tikka",
        description: "Creamy and soft paneer malai tikka.",
        image:
          "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
        price: 229,
        category: "Starters",
        cuisine: "Indian",
        tags: ["paneer", "veg", "protein"],
        isVeg: true,
        isAvailable: true,
        rating: 4.7,
      },

      {
        restaurant: createdRestaurants[9]._id,
        name: "Tandoori Fish",
        description: "Fresh fish marinated with Indian spices and grilled.",
        image:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
        price: 329,
        category: "Tandoori",
        cuisine: "Indian",
        tags: ["fish", "spicy", "high-protein", "healthy"],
        isVeg: false,
        isAvailable: true,
        rating: 4.7,
      },
    ];

    // Insert foods
    const createdFoods = await Food.insertMany(foodData);

    console.log(
      `${createdFoods.length} food items inserted`
    );

    console.log(
      "========================================"
    );

    console.log(
      "Database seeded successfully!"
    );

    console.log(
      `Restaurants: ${createdRestaurants.length}`
    );

    console.log(
      `Food Items: ${createdFoods.length}`
    );

    console.log(
      "========================================"
    );

    process.exit(0);

  } catch (error) {
    console.error(
      "Database Seed Error:",
      error
    );

    process.exit(1);
  }
};

seedDatabase();