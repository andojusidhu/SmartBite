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

connectDB();

const app = express();

// =========================
// CORS
// =========================

const allowedOrigins = [
  "http://localhost:5173",
  "https://smart-bite-pi.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin
      // Example: Postman, curl
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },
    credentials: true,
  })
);

// =========================
// MIDDLEWARE
// =========================

app.use(express.json());

// =========================
// ROUTES
// =========================

app.use("/api/auth", authRoutes);

app.use("/api/restaurants", restaurantRoutes);

app.use("/api/foods", foodRoutes);

app.use("/api/orders", orderRoutes);

app.use(
  "/api/recommendations",
  recommendationRoutes
);

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