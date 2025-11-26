const express = require("express");
const router = express.Router();
const { fetchCategories, fetchCategoryById, createCategory, modifyCategory, removeCategory } = require("../controllers/categoryController");

router.get("/", fetchCategories);
router.get("/:id", fetchCategoryById);
router.post("/", createCategory);
router.put("/:id", modifyCategory);
router.delete("/:id", removeCategory);

module.exports = router;
