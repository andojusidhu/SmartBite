const express = require("express");
const router = express.Router();

const { aiRecommend } = require("../controllers/aiController");
const protect = require("../middleware/authMiddleware");

router.post("/recommend", protect, aiRecommend);

module.exports = router;