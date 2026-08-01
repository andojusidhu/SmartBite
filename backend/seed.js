const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Restaurant = require("./models/Restaurant");
const Food = require("./models/Food");

dotenv.config();

// ===============================
// Restaurants Data
// ===============================

const restaurantsData = [
  {
    name: "Spice Garden",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    cuisine: ["Indian", "North Indian"],
    rating: 4.7,
    deliveryTime: "25-35 min",
    deliveryFee: 40,
    location: "Madhapur",
    isOpen: true,
  },

  {
    name: "Biryani House",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80",
    cuisine: ["Indian", "Biryani"],
    rating: 4.8,
    deliveryTime: "30-40 min",
    deliveryFee: 30,
    location: "Kukatpally",
    isOpen: true,
  },

  {
    name: "Urban Bites",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80",
    cuisine: ["Burgers", "Fast Food"],
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: 25,
    location: "Gachibowli",
    isOpen: true,
  },

  {
    name: "Dragon Wok",
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
    cuisine: ["Chinese", "Asian"],
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 35,
    location: "Hitech City",
    isOpen: true,
  },

  {
    name: "Pizza Point",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80",
    cuisine: ["Pizza", "Italian"],
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: 30,
    location: "Banjara Hills",
    isOpen: true,
  },

  {
    name: "Healthy Bites",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    cuisine: ["Healthy", "Vegetarian"],
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: 20,
    location: "Jubilee Hills",
    isOpen: true,
  },

  {
    name: "South Spice",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    cuisine: ["South Indian", "Indian"],
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 20,
    location: "Ameerpet",
    isOpen: true,
  },

  {
    name: "Sweet Treats",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
    cuisine: ["Desserts", "Bakery"],
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: 25,
    location: "Kondapur",
    isOpen: true,
  },

  {
    name: "Protein Hub",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    cuisine: ["Healthy", "High Protein"],
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 30,
    location: "Madhapur",
    isOpen: true,
  },

  {
    name: "The Food Factory",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
    cuisine: ["Indian", "Fast Food"],
    rating: 4.4,
    deliveryTime: "30-40 min",
    deliveryFee: 35,
    location: "Secunderabad",
    isOpen: true,
  },
];

// ===============================
// Food Data
// ===============================

const foodData = [
  // =========================
  // Spice Garden
  // =========================

  {
    restaurantIndex: 0,
    name: "Chicken Tikka",
    description: "Juicy chicken pieces marinated with Indian spices.",
    image:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
    price: 249,
    category: "Starters",
    cuisine: "Indian",
    tags: ["chicken", "spicy", "high-protein"],
    isVeg: false,
    rating: 4.7,
  },

  {
    restaurantIndex: 0,
    name: "Paneer Butter Masala",
    description: "Soft paneer cooked in a creamy tomato gravy.",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    price: 219,
    category: "Main Course",
    cuisine: "North Indian",
    tags: ["paneer", "vegetarian", "creamy"],
    isVeg: true,
    rating: 4.6,
  },

  {
    restaurantIndex: 0,
    name: "Butter Naan",
    description: "Soft Indian naan topped with butter.",
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80",
    price: 49,
    category: "Breads",
    cuisine: "Indian",
    tags: ["bread", "vegetarian"],
    isVeg: true,
    rating: 4.5,
  },

  {
    restaurantIndex: 0,
    name: "Chicken Curry",
    description: "Traditional spicy chicken curry.",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    price: 269,
    category: "Main Course",
    cuisine: "Indian",
    tags: ["chicken", "spicy", "high-protein"],
    isVeg: false,
    rating: 4.7,
  },

  {
    restaurantIndex: 0,
    name: "Gulab Jamun",
    description: "Soft and sweet Indian dessert.",
    image:
      "https://images.unsplash.com/photo-1666190094765-4b2b8c8d2a5d?auto=format&fit=crop&w=800&q=80",
    price: 99,
    category: "Dessert",
    cuisine: "Indian",
    tags: ["sweet", "dessert", "vegetarian"],
    isVeg: true,
    rating: 4.5,
  },

  // =========================
  // Biryani House
  // =========================

  {
    restaurantIndex: 1,
    name: "Chicken Biryani",
    description: "Aromatic Hyderabadi chicken dum biryani.",
    image:
      "https://img.freepik.com/premium-photo/traditional-chicken-biryani-aromatic-indian-cuisine-food_1124848-123286.jpg?w=2000",
    price: 229,
    category: "Biryani",
    cuisine: "Indian",
    tags: ["chicken", "biryani", "spicy", "high-protein"],
    isVeg: false,
    rating: 4.8,
  },

  {
    restaurantIndex: 1,
    name: "Mutton Biryani",
    description: "Rich and flavorful mutton dum biryani.",
    image:
      "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=800&q=80",
    price: 299,
    category: "Biryani",
    cuisine: "Indian",
    tags: ["mutton", "biryani", "spicy", "high-protein"],
    isVeg: false,
    rating: 4.8,
  },

  {
    restaurantIndex: 1,
    name: "Paneer Biryani",
    description: "Flavorful vegetarian biryani with paneer.",
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
    price: 199,
    category: "Biryani",
    cuisine: "Indian",
    tags: ["paneer", "biryani", "vegetarian"],
    isVeg: true,
    rating: 4.5,
  },

  {
    restaurantIndex: 1,
    name: "Chicken 65",
    description: "Crispy spicy fried chicken starter.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    price: 189,
    category: "Starters",
    cuisine: "Indian",
    tags: ["chicken", "spicy", "high-protein"],
    isVeg: false,
    rating: 4.6,
  },

  {
    restaurantIndex: 1,
    name: "Double Ka Meetha",
    description: "Traditional Hyderabadi bread dessert.",
    image:
      "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
    price: 119,
    category: "Dessert",
    cuisine: "Indian",
    tags: ["sweet", "dessert", "vegetarian"],
    isVeg: true,
    rating: 4.5,
  },

  // =========================
  // Urban Bites
  // =========================

  {
    restaurantIndex: 2,
    name: "Classic Chicken Burger",
    description: "Juicy chicken burger with fresh vegetables.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    price: 199,
    category: "Burgers",
    cuisine: "Fast Food",
    tags: ["chicken", "burger", "high-protein"],
    isVeg: false,
    rating: 4.6,
  },

  {
    restaurantIndex: 2,
    name: "Veggie Burger",
    description: "Crispy vegetarian patty with fresh vegetables.",
    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80",
    price: 159,
    category: "Burgers",
    cuisine: "Fast Food",
    tags: ["burger", "vegetarian"],
    isVeg: true,
    rating: 4.4,
  },

  {
    restaurantIndex: 2,
    name: "Chicken Wings",
    description: "Crispy spicy chicken wings.",
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80",
    price: 229,
    category: "Starters",
    cuisine: "Fast Food",
    tags: ["chicken", "spicy", "high-protein"],
    isVeg: false,
    rating: 4.6,
  },

  {
    restaurantIndex: 2,
    name: "French Fries",
    description: "Crispy golden french fries.",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
    price: 99,
    category: "Sides",
    cuisine: "Fast Food",
    tags: ["snacks", "vegetarian"],
    isVeg: true,
    rating: 4.3,
  },

  {
    restaurantIndex: 2,
    name: "Chocolate Shake",
    description: "Rich creamy chocolate milkshake.",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    price: 129,
    category: "Beverages",
    cuisine: "Fast Food",
    tags: ["sweet", "dessert", "vegetarian"],
    isVeg: true,
    rating: 4.5,
  },

  // =========================
  // Dragon Wok
  // =========================

  {
    restaurantIndex: 3,
    name: "Chicken Fried Rice",
    description: "Wok tossed rice with chicken and vegetables.",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    price: 199,
    category: "Rice",
    cuisine: "Chinese",
    tags: ["chicken", "rice", "high-protein"],
    isVeg: false,
    rating: 4.6,
  },

  {
    restaurantIndex: 3,
    name: "Veg Hakka Noodles",
    description: "Classic Chinese noodles with fresh vegetables.",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    price: 169,
    category: "Noodles",
    cuisine: "Chinese",
    tags: ["noodles", "vegetarian"],
    isVeg: true,
    rating: 4.5,
  },

  {
    restaurantIndex: 3,
    name: "Chilli Chicken",
    description: "Spicy Indo-Chinese chicken preparation.",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    price: 239,
    category: "Starters",
    cuisine: "Chinese",
    tags: ["chicken", "spicy", "high-protein"],
    isVeg: false,
    rating: 4.7,
  },

  {
    restaurantIndex: 3,
    name: "Veg Manchurian",
    description: "Crispy vegetable balls in spicy sauce.",
    image:
      "https://images.unsplash.com/photo-1625398407796-82650a8c8e7a?auto=format&fit=crop&w=800&q=80",
    price: 179,
    category: "Starters",
    cuisine: "Chinese",
    tags: ["spicy", "vegetarian"],
    isVeg: true,
    rating: 4.4,
  },

  {
    restaurantIndex: 3,
    name: "Spring Rolls",
    description: "Crispy rolls stuffed with fresh vegetables.",
    image:
      "https://images.unsplash.com/photo-1548507200-d8c1f5a8c2e3?auto=format&fit=crop&w=800&q=80",
    price: 149,
    category: "Starters",
    cuisine: "Chinese",
    tags: ["snacks", "vegetarian"],
    isVeg: true,
    rating: 4.3,
  },

  // =========================
  // Pizza Point
  // =========================

  {
    restaurantIndex: 4,
    name: "Chicken Pepperoni Pizza",
    description: "Cheesy pizza topped with chicken pepperoni.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    price: 299,
    category: "Pizza",
    cuisine: "Italian",
    tags: ["chicken", "pizza", "high-protein"],
    isVeg: false,
    rating: 4.7,
  },

  {
    restaurantIndex: 4,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, basil and mozzarella.",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80",
    price: 249,
    category: "Pizza",
    cuisine: "Italian",
    tags: ["pizza", "vegetarian"],
    isVeg: true,
    rating: 4.6,
  },

  {
    restaurantIndex: 4,
    name: "Farmhouse Pizza",
    description: "Pizza loaded with fresh vegetables.",
    image:
      "https://images.unsplash.com/photo-1593560708920-61dd98c8c1b8?auto=format&fit=crop&w=800&q=80",
    price: 279,
    category: "Pizza",
    cuisine: "Italian",
    tags: ["pizza", "healthy", "vegetarian"],
    isVeg: true,
    rating: 4.5,
  },

  {
    restaurantIndex: 4,
    name: "Garlic Bread",
    description: "Soft bread with garlic butter and herbs.",
    image:
      "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&w=800&q=80",
    price: 129,
    category: "Sides",
    cuisine: "Italian",
    tags: ["bread", "vegetarian"],
    isVeg: true,
    rating: 4.4,
  },

  {
    restaurantIndex: 4,
    name: "Pasta Alfredo",
    description: "Creamy Italian pasta with parmesan cheese.",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
    price: 229,
    category: "Pasta",
    cuisine: "Italian",
    tags: ["pasta", "vegetarian", "creamy"],
    isVeg: true,
    rating: 4.5,
  },

  // =========================
  // Healthy Bites
  // =========================

  {
    restaurantIndex: 5,
    name: "Paneer Protein Bowl",
    description: "Healthy bowl with paneer and fresh vegetables.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    price: 219,
    category: "Healthy Bowls",
    cuisine: "Healthy",
    tags: ["paneer", "healthy", "high-protein", "vegetarian"],
    isVeg: true,
    rating: 4.7,
  },

  {
    restaurantIndex: 5,
    name: "Grilled Chicken Salad",
    description: "Fresh vegetables topped with grilled chicken.",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80",
    price: 249,
    category: "Salads",
    cuisine: "Healthy",
    tags: ["chicken", "healthy", "high-protein"],
    isVeg: false,
    rating: 4.8,
  },

  {
    restaurantIndex: 5,
    name: "Avocado Salad",
    description: "Fresh avocado with healthy vegetables.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    price: 229,
    category: "Salads",
    cuisine: "Healthy",
    tags: ["healthy", "vegetarian"],
    isVeg: true,
    rating: 4.6,
  },

  {
    restaurantIndex: 5,
    name: "Fruit Bowl",
    description: "Fresh seasonal fruits in a healthy bowl.",
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80",
    price: 149,
    category: "Healthy",
    cuisine: "Healthy",
    tags: ["healthy", "sweet", "vegetarian"],
    isVeg: true,
    rating: 4.5,
  },

  {
    restaurantIndex: 5,
    name: "Oats Protein Bowl",
    description: "Healthy oats bowl packed with protein.",
    image:
      "https://bowlsarethenewplates.com/wp-content/uploads/2022/03/overnight-oats-protein-bowl-12-1024x1024.jpg",
    price: 179,
    category: "Healthy",
    cuisine: "Healthy",
    tags: ["healthy", "high-protein", "vegetarian"],
    isVeg: true,
    rating: 4.6,
  },

  // =========================
  // South Spice
  // =========================

  {
    restaurantIndex: 6,
    name: "Masala Dosa",
    description: "Crispy dosa filled with spicy potato masala.",
    image:
      "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/masala_dosa.jpg",
    price: 99,
    category: "Breakfast",
    cuisine: "South Indian",
    tags: ["dosa", "vegetarian"],
    isVeg: true,
    rating: 4.7,
  },

  {
    restaurantIndex: 6,
    name: "Idli Sambar",
    description: "Soft idlis served with hot sambar.",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    price: 79,
    category: "Breakfast",
    cuisine: "South Indian",
    tags: ["healthy", "vegetarian"],
    isVeg: true,
    rating: 4.6,
  },

  {
    restaurantIndex: 6,
    name: "Paneer Dosa",
    description: "Crispy dosa stuffed with spicy paneer.",
    image:
      "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80",
    price: 149,
    category: "Dosa",
    cuisine: "South Indian",
    tags: ["paneer", "spicy", "vegetarian"],
    isVeg: true,
    rating: 4.5,
  },

  {
    restaurantIndex: 6,
    name: "Chicken 65",
    description: "Spicy South Indian fried chicken.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    price: 189,
    category: "Starters",
    cuisine: "South Indian",
    tags: ["chicken", "spicy", "high-protein"],
    isVeg: false,
    rating: 4.6,
  },

  {
    restaurantIndex: 6,
    name: "Filter Coffee",
    description: "Traditional South Indian filter coffee.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    price: 59,
    category: "Beverages",
    cuisine: "South Indian",
    tags: ["coffee", "vegetarian"],
    isVeg: true,
    rating: 4.5,
  },

  // =========================
  // Sweet Treats
  // =========================

  {
    restaurantIndex: 7,
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    price: 149,
    category: "Dessert",
    cuisine: "Bakery",
    tags: ["sweet", "dessert", "chocolate"],
    isVeg: true,
    rating: 4.7,
  },

  {
    restaurantIndex: 7,
    name: "Red Velvet Cake",
    description: "Soft red velvet cake with cream cheese frosting.",
    image:
      "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80",
    price: 169,
    category: "Dessert",
    cuisine: "Bakery",
    tags: ["sweet", "dessert"],
    isVeg: true,
    rating: 4.6,
  },

  {
    restaurantIndex: 7,
    name: "Chocolate Brownie",
    description: "Warm fudgy chocolate brownie.",
    image:
      "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80",
    price: 129,
    category: "Dessert",
    cuisine: "Bakery",
    tags: ["sweet", "dessert", "chocolate"],
    isVeg: true,
    rating: 4.7,
  },

  {
    restaurantIndex: 7,
    name: "Donuts",
    description: "Soft glazed donuts.",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
    price: 99,
    category: "Dessert",
    cuisine: "Bakery",
    tags: ["sweet", "dessert"],
    isVeg: true,
    rating: 4.5,
  },

  {
    restaurantIndex: 7,
    name: "Fruit Pastry",
    description: "Fresh fruit pastry with cream.",
    image:
      "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=800&q=80",
    price: 119,
    category: "Dessert",
    cuisine: "Bakery",
    tags: ["sweet", "dessert", "vegetarian"],
    isVeg: true,
    rating: 4.4,
  },

  // =========================
  // Protein Hub
  // =========================

  {
    restaurantIndex: 8,
    name: "Grilled Chicken Bowl",
    description: "High-protein grilled chicken with vegetables.",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    price: 279,
    category: "Protein Bowl",
    cuisine: "Healthy",
    tags: ["chicken", "healthy", "high-protein"],
    isVeg: false,
    rating: 4.8,
  },

  {
    restaurantIndex: 8,
    name: "Chicken Salad",
    description: "Fresh salad with grilled chicken.",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80",
    price: 239,
    category: "Salad",
    cuisine: "Healthy",
    tags: ["chicken", "healthy", "high-protein"],
    isVeg: false,
    rating: 4.7,
  },

  {
    restaurantIndex: 8,
    name: "Paneer Protein Bowl",
    description: "Protein-rich paneer bowl with vegetables.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    price: 229,
    category: "Protein Bowl",
    cuisine: "Healthy",
    tags: ["paneer", "healthy", "high-protein", "vegetarian"],
    isVeg: true,
    rating: 4.6,
  },

  {
    restaurantIndex: 8,
    name: "Egg Protein Bowl",
    description: "Eggs served with vegetables and healthy grains.",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    price: 199,
    category: "Protein Bowl",
    cuisine: "Healthy",
    tags: ["egg", "healthy", "high-protein"],
    isVeg: false,
    rating: 4.6,
  },

  {
    restaurantIndex: 8,
    name: "Protein Smoothie",
    description: "Healthy protein smoothie with fresh fruits.",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",
    price: 179,
    category: "Beverages",
    cuisine: "Healthy",
    tags: ["healthy", "high-protein", "sweet"],
    isVeg: true,
    rating: 4.5,
  },

  // =========================
  // The Food Factory
  // =========================

  {
    restaurantIndex: 9,
    name: "Chicken Shawarma",
    description: "Juicy chicken shawarma with fresh vegetables.",
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80",
    price: 179,
    category: "Fast Food",
    cuisine: "Indian",
    tags: ["chicken", "high-protein"],
    isVeg: false,
    rating: 4.5,
  },

  {
    restaurantIndex: 9,
    name: "Paneer Roll",
    description: "Soft roll stuffed with spicy paneer.",
    image:
      "https://images.unsplash.com/photo-1628294895950-9805252327f3?auto=format&fit=crop&w=800&q=80",
    price: 149,
    category: "Rolls",
    cuisine: "Indian",
    tags: ["paneer", "spicy", "vegetarian"],
    isVeg: true,
    rating: 4.4,
  },

  {
    restaurantIndex: 9,
    name: "Chicken Fried Rice",
    description: "Flavorful fried rice with chicken.",
    image:
      "https://easychickenrecipes.com/wp-content/uploads/2022/05/featured-chicken-fried-rice-recipe.jpg",
    price: 189,
    category: "Rice",
    cuisine: "Indian",
    tags: ["chicken", "high-protein"],
    isVeg: false,
    rating: 4.5,
  },

  {
    restaurantIndex: 9,
    name: "Veg Noodles",
    description: "Stir-fried noodles with fresh vegetables.",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    price: 159,
    category: "Noodles",
    cuisine: "Indian",
    tags: ["noodles", "vegetarian"],
    isVeg: true,
    rating: 4.3,
  },

  {
    restaurantIndex: 9,
    name: "Mango Lassi",
    description: "Refreshing creamy mango lassi.",
    image:
      "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80",
    price: 89,
    category: "Beverages",
    cuisine: "Indian",
    tags: ["sweet", "vegetarian"],
    isVeg: true,
    rating: 4.6,
  },
];

// ===============================
// Seed Database
// ===============================

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Clear existing data
    await Restaurant.deleteMany({});
    await Food.deleteMany({});

    console.log("Old restaurants and food items deleted");

    // Insert restaurants
    const restaurants = await Restaurant.insertMany(
      restaurantsData
    );

    console.log(
      `${restaurants.length} restaurants inserted`
    );

    // Connect food items with restaurant IDs
    const foodsToInsert = foodData.map((food) => {
      const restaurant = restaurants[food.restaurantIndex];

      return {
        name: food.name,
        description: food.description,
        image: food.image,
        price: food.price,
        category: food.category,
        cuisine: food.cuisine,
        tags: food.tags,
        isVeg: food.isVeg,
        isAvailable: true,
        rating: food.rating,
        restaurant: restaurant._id,
      };
    });

    // Insert food
    const foods = await Food.insertMany(
      foodsToInsert
    );

    console.log(
      `${foods.length} food items inserted`
    );

    console.log("\n================================");
    console.log("Database Seeded Successfully!");
    console.log("================================");
    console.log(
      `Restaurants: ${restaurants.length}`
    );
    console.log(`Food Items: ${foods.length}`);
    console.log("================================\n");

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