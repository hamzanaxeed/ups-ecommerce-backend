
const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const productRoutes = require("./routes/product.js");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from UPS Ecommerce Backend 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
  ]);
});

app.listen(PORT, () => {
  console.log(`UPS Ecommerce Backend is running on port ${PORT} 🚀`);
});
