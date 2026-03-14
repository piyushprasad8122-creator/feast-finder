const express = require("express");
const router = express.Router();
const {
  getRestaurants,
  getMenuByRestaurant
} = require("../controllers/restaurantController.cjs");

router.get("/restaurants", getRestaurants);
router.get("/menu/:restaurantId", getMenuByRestaurant);

module.exports = router;
