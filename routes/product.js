const express = require("express");
const router = express.Router();
const { fetchProducts, fetchProductById } = require("../controllers/product_Controller");

// GET /api/products/ -> returns products from Supabase
router.get("/", fetchProducts);
// GET /api/products/:id -> returns a single product by id
router.get("/:id", fetchProductById);

module.exports = router;
