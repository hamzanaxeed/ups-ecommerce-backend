const express = require("express");
const router = express.Router();
const { fetchCategories, fetchCategoryById, createCategory, modifyCategory, removeCategory } = require("../controllers/category_Controller");

// GET /api/categories/ -> returns all categories from Supabase
router.get("/", fetchCategories);
// POST /api/categories/ -> creates a new category
router.post("/", createCategory);
// GET /api/categories/:id -> returns a single category with product count
router.get("/:id", fetchCategoryById);
// PUT /api/categories/:id -> updates a category
router.put("/:id", modifyCategory);
// DELETE /api/categories/:id -> deletes a category
router.delete("/:id", removeCategory);

module.exports = router;
