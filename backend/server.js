const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const aiRoutes = require("./routes/aiRoutes");

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// =========================
// CORS
// =========================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://smart-bite-pi.vercel.app",
    ],
    credentials: true,
  })
);

// Parse JSON
app.use(express.json());

// =========================
// ROUTES
// =========================

app.use("/api/auth", authRoutes);

app.use("/api/restaurants", restaurantRoutes);

app.use("/api/foods", foodRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/recommendations", recommendationRoutes);

app.use("/api/ai", aiRoutes);

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "SmartBite Backend API is running 🚀",
  });
});

// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});