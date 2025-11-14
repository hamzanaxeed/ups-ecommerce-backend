const express = require("express");
const router = express.Router();
const { fetchProducts, fetchProductById, createProduct, modifyProduct, removeProduct } = require("../controllers/product_Controller");

// GET /api/products/ -> returns products from Supabase
router.get("/", fetchProducts);
// POST /api/products/ -> creates a new product
router.post("/", createProduct);
// GET /api/products/:id -> returns a single product by id
router.get("/:id", fetchProductById);
// PUT /api/products/:id -> updates a product
router.put("/:id", modifyProduct);
// DELETE /api/products/:id -> deletes a product
router.delete("/:id", removeProduct);

module.exports = router;
