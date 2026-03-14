const db = require("../../db.cjs");

const getRestaurants = (req, res) => {
  const query = "SELECT * FROM restaurants";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching restaurants:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
};

const getMenuByRestaurant = (req, res) => {
  const restaurantId = req.params.restaurantId;
  const query = "SELECT * FROM menu WHERE restaurant_id = ?";

  db.query(query, [restaurantId], (err, results) => {
    if (err) {
      console.error("Error fetching menu:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
};

module.exports = {
  getRestaurants,
  getMenuByRestaurant
};
