const db = require("../db.cjs");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// GET all restaurants from MySQL
app.get("/api/restaurants", (req, res) => {
  const query = "SELECT * FROM restaurants";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching restaurants:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

// GET menu by restaurant ID from MySQL
app.get("/api/menu/:restaurantId", (req, res) => {
  const restaurantId = req.params.restaurantId;
  const query = "SELECT * FROM menu WHERE restaurant_id = ?";

  db.query(query, [restaurantId], (err, results) => {
    if (err) {
      console.error("Error fetching menu:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

// POST order to MySQL
app.post("/api/order", (req, res) => {
  const { cart, totalAmount } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const orderQuery =
    "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)";
  const orderValues = [null, totalAmount, "placed"];

  db.query(orderQuery, orderValues, (err, orderResult) => {
    if (err) {
      console.error("Error creating order:", err);
      return res.status(500).json({ error: "Database error while creating order" });
    }

    const orderId = orderResult.insertId;

    const orderItemsValues = cart.map((item) => [
      orderId,
      item.id,
      item.quantity,
      item.price
    ]);

    const orderItemsQuery =
      "INSERT INTO order_items (order_id, menu_id, quantity, price) VALUES ?";

    db.query(orderItemsQuery, [orderItemsValues], (err) => {
      if (err) {
        console.error("Error inserting order items:", err);
        return res.status(500).json({ error: "Database error while saving order items" });
      }

      res.json({
        message: "Order placed successfully",
        orderId: orderId
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
