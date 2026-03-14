const express = require("express");
const cors = require("cors");

const restaurantRoutes = require("./routes/restaurantRoutes.cjs");
const orderRoutes = require("./routes/orderRoutes.cjs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", restaurantRoutes);
app.use("/api", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
