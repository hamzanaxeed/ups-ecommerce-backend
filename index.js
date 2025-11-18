
const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const productRoutes = require("./routes/product.js");
const categoryRoutes = require("./routes/category.js");
const serviceRoutes = require("./routes/service.js");
const slotsRoutes = require("./routes/slots.js");
const orderRoutes = require("./routes/order.js");
const paymentRoutes = require("./routes/payment.js");
const feedbackRoutes = require("./routes/feedback.js");
const favouriteRoutes = require("./routes/favourite.js");

const app = express();

// CORS must be before express.json() and routes
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174"
    ].filter(Boolean);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for development
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS middleware (this handles all OPTIONS preflight requests automatically)
app.use(cors(corsOptions));

app.use(express.json());

const PORT = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,      // production frontend
      "http://localhost:5173"        // your local frontend
    ],
    credentials: true,
  })
);


// Routes
app.get("/", (req, res) => {
  res.send("Hello from UPS Ecommerce Backend 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/slots", slotsRoutes);
app.use("/api/favourites", favouriteRoutes);

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
