const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    location: "Bangalore",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
  },
  {
    id: 2,
    name: "Pizza Hub",
    location: "Bangalore",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
  },
  {
    id: 3,
    name: "Sushi World",
    location: "Bangalore",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c"
  }
];

const menu = {
  1: [
    { id: 1, restaurant_id: 1, item_name: "Paneer Butter Masala", price: 250, description: "Rich creamy paneer curry" },
    { id: 2, restaurant_id: 1, item_name: "Butter Naan", price: 40, description: "Soft buttery naan" }
  ],
  2: [
    { id: 3, restaurant_id: 2, item_name: "Margherita Pizza", price: 299, description: "Classic cheese pizza" },
    { id: 4, restaurant_id: 2, item_name: "Veggie Supreme", price: 399, description: "Loaded veggie pizza" }
  ],
  3: [
    { id: 5, restaurant_id: 3, item_name: "California Roll", price: 350, description: "Fresh sushi roll" },
    { id: 6, restaurant_id: 3, item_name: "Miso Soup", price: 120, description: "Traditional Japanese soup" }
  ]
};

app.get("/api/restaurants", (req, res) => {
  res.json(restaurants);
});

app.get("/api/menu/:restaurantId", (req, res) => {
  const restaurantId = req.params.restaurantId;
  res.json(menu[restaurantId] || []);
});

app.post("/api/order", (req, res) => {
  const { cart, totalAmount } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  res.json({ message: "Order placed successfully", totalAmount });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
