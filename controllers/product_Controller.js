const { getAllProducts, getProductById, addProduct } = require("../models/product_Model");

async function fetchProducts(req, res) {
  try {
    const products = await getAllProducts();

    // If the stored function returns a JSON object with a key (e.g. { products: [...] })
    // normalize to a `products` array when possible.
    if (products && typeof products === "object" && !Array.isArray(products)) {
      // Try common keys first
      if (products.products) return res.json({ products: products.products });
      if (products.data) return res.json({ products: products.data });
      // otherwise return as-is
      return res.json({ products });
    }

    return res.json({ products });
  } catch (err) {
    console.error("Error fetching products:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
}

async function fetchProductById(req, res) {
  try {
    const productId = req.params.id;
    if (!productId) return res.status(400).json({ error: "Product id required" });

    const product = await getProductById(productId);

    if (!product) return res.status(404).json({ error: "Product not found" });

    return res.json({ product });
  } catch (err) {
    console.error("Error fetching product by id:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch product" });
  }
}

async function createProduct(req, res) {
  try {
    const { name, price, description, category_id } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    const product = await addProduct({
      name,
      price,
      description: description || null,
      category_id: category_id || null,
    });

    if (!product) return res.status(400).json({ error: "Failed to create product" });

    return res.status(201).json({ message: "Product created", product });
  } catch (err) {
    console.error("Error creating product:", err.message || err);
    return res.status(500).json({ error: "Failed to create product" });
  }
}

module.exports = { fetchProducts, fetchProductById, createProduct };
