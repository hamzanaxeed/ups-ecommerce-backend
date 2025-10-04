import dotenv from "dotenv";

const PORT = process.env.PORT || 4000;
dotenv.config();

const express = require("express");

const cors = require("cors");
const app = express();

// enable cors
app.use(cors());

// define root route
app.get("/", (req, res) => {
  res.send("Hello from UPS Ecommerce Backend 🚀");
});

app.listen(PORT, () => {
  console.log(`UPS Ecommerce Backend is running on port ${PORT} 🚀`);
});

// Sample products route
app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
  ]);
});
