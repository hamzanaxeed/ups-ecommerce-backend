const { getAllProducts, getProductById } = require("../models/product_Model");

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

module.exports = { fetchProducts, fetchProductById };
