const supabase = require("../db/supabaseClient");

async function getAllCategories() {
  const { data, error } = await supabase.rpc("get_all_categories");
  if (error) throw error;
  return data; // returns JSON array of categories
}

async function getCategoryById(categoryId) {
  const { data, error } = await supabase.rpc("get_category_with_product_count", {
    p_category_id: categoryId,
  });
  if (error) throw error;
  return data; // JSON object
}

async function addCategory({ name, description, image }) {
  const { data, error } = await supabase.rpc("add_category", {
    p_name: name,
    p_description: description,
    p_image: image,
  });

  if (error) throw error;
  return data; // Returns JSON object of new category
}

async function updateCategory({ category_id, name, description, image }) {
  const { data, error } = await supabase.rpc("update_category", {
    p_category_id: category_id,
    p_name: name,
    p_description: description,
    p_image: image,
  });
  if (error) throw error;
  return data;
}

async function deleteCategory(category_id) {
  const { data, error } = await supabase.rpc("delete_category", {
    p_category_id: category_id,
  });
  if (error) throw error;
  return data;
}

module.exports = { getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory };
