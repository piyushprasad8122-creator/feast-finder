const db = require("../../db.cjs");

const placeOrder = (req, res) => {
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
        orderId
      });
    });
  });
};

module.exports = {
  placeOrder
};
