const supabase = require("../db/supabaseClient");

async function getAllProducts() {
  // Calls a Supabase stored procedure named `get_all_products` which
  // should return the products in JSON format.
  const { data, error } = await supabase.rpc("get_all_products");

  if (error) {
    // Let caller handle the error
    throw error;
  }

  // The RPC may return directly an array/object depending on how it's defined
  return data;
}

async function getProductById(productId) {
  // Calls a Supabase stored procedure named `get_product_by_id` which
  // expects a parameter `p_product_id` and returns the single product.
  const { data, error } = await supabase.rpc("get_product_by_id", {
    p_product_id: productId,
  });

  if (error) {
    throw error;
  }

  return data;
}

async function addProduct({ name, price, description, category_id }) {
  // Calls a Supabase stored procedure named `add_product` which
  // expects parameters: p_name, p_price, p_description, p_category_id
  // and returns the created product.
  const { data, error } = await supabase.rpc("add_product", {
    p_name: name,
    p_price: price,
    p_description: description,
    p_category_id: category_id,
  });

  if (error) {
    throw error;
  }

  return data;
}

async function updateProduct({ product_id, name, price, description, category_id }) {
  const { data, error } = await supabase.rpc("update_product", {
    p_product_id: product_id,
    p_name: name,
    p_price: price,
    p_description: description,
    p_category_id: category_id,
  });
  if (error) throw error;
  return data;
}

async function deleteProduct(product_id) {
  const { data, error } = await supabase.rpc("delete_product", {
    p_product_id: product_id,
  });
  if (error) throw error;
  return data;
}

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };
