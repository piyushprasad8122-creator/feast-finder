const express = require("express");
const router = express.Router();
const { placeOrder } = require("../controllers/orderController.cjs");

router.post("/order", placeOrder);

module.exports = router;
