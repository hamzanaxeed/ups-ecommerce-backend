const express = require("express");
const router = express.Router();
const { fetchCategories, fetchCategoryById, createCategory, modifyCategory, removeCategory } = require("../controllers/category_Controller");
const {
	GetAllCategoriesRepository,
	GetCategoryByIdRepository,
	CreateCategoryRepository,
	UpdateCategoryRepository,
	DeleteCategoryRepository,
} = require("../repositories/categoryOperations");
const CategoryService = require("../services/category_Service");

const getAllRepo = new GetAllCategoriesRepository();
const getByIdRepo = new GetCategoryByIdRepository();
const createRepo = new CreateCategoryRepository();
const updateRepo = new UpdateCategoryRepository();
const deleteRepo = new DeleteCategoryRepository();

const categoryService = new CategoryService({ getAllRepo, getByIdRepo, createRepo, updateRepo, deleteRepo });

router.get("/", (req, res) => fetchCategories(req, res, categoryService));
router.get("/:id", (req, res) => fetchCategoryById(req, res, categoryService));
router.post("/", (req, res) => createCategory(req, res, categoryService));
router.put("/:id", (req, res) => modifyCategory(req, res, categoryService));
router.delete("/:id", (req, res) => removeCategory(req, res, categoryService));

module.exports = router;
