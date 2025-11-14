const { getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory } = require("../models/category_Model");

async function fetchCategories(req, res) {
  try {
    const categories = await getAllCategories();

    // Normalize response similar to products
    if (categories && typeof categories === "object" && !Array.isArray(categories)) {
      if (categories.categories) return res.json({ categories: categories.categories });
      if (categories.data) return res.json({ categories: categories.data });
      return res.json({ categories });
    }

    return res.json({ categories });
  } catch (err) {
    console.error("Error fetching categories:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch categories" });
  }
}

async function fetchCategoryById(req, res) {
  try {
    const categoryId = req.params.id;
    if (!categoryId) return res.status(400).json({ error: "Category id required" });

    const category = await getCategoryById(categoryId);

    if (!category) return res.status(404).json({ error: "Category not found" });

    return res.json({ category });
  } catch (err) {
    console.error("Error fetching category by id:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch category" });
  }
}

async function createCategory(req, res) {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const category = await addCategory({
      name,
      description: description || null,
    });

    if (!category) return res.status(400).json({ error: "Failed to create category" });

    return res.status(201).json({ message: "Category created", category });
  } catch (err) {
    console.error("Error creating category:", err.message || err);
    return res.status(500).json({ error: "Failed to create category" });
  }
}

async function modifyCategory(req, res) {
  try {
    const categoryId = req.params.id;
    const { name, description } = req.body;

    if (!categoryId) return res.status(400).json({ error: "Category id required" });
    if (!name) return res.status(400).json({ error: "Category name is required" });

    const category = await updateCategory({
      category_id: categoryId,
      name,
      description: description || null,
    });

    if (!category) return res.status(404).json({ error: "Category not found" });

    return res.json({ message: "Category updated", category });
  } catch (err) {
    console.error("Error updating category:", err.message || err);
    return res.status(500).json({ error: "Failed to update category" });
  }
}

async function removeCategory(req, res) {
  try {
    const categoryId = req.params.id;

    if (!categoryId) return res.status(400).json({ error: "Category id required" });

    const result = await deleteCategory(categoryId);

    if (!result) return res.status(404).json({ error: "Category not found" });

    return res.json({ message: "Category deleted" });
  } catch (err) {
    console.error("Error deleting category:", err.message || err);
    return res.status(500).json({ error: "Failed to delete category" });
  }
}

module.exports = { fetchCategories, fetchCategoryById, createCategory, modifyCategory, removeCategory };
