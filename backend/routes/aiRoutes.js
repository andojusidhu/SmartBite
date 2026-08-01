const express = require("express");

const router = express.Router();

const {
  aiRecommend,
} = require("../controllers/aiController");

router.post(
  "/recommend",
  aiRecommend
);

module.exports = router;