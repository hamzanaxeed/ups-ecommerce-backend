const express = require("express");
const router = express.Router();
const { fetchProducts, fetchProductById, createProduct } = require("../controllers/product_Controller");

// GET /api/products/ -> returns products from Supabase
router.get("/", fetchProducts);
// POST /api/products/ -> creates a new product
router.post("/", createProduct);
// GET /api/products/:id -> returns a single product by id
router.get("/:id", fetchProductById);

module.exports = router;
