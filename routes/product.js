const express = require("express");
const router = express.Router();

const {
    fetchProducts,
    fetchProductByIdHandler,
    createProductHandler,
    updateProductHandler,
    removeProductHandler
} = require("../controllers/product_Controller");

const {
    GetAllProductsRepository,
    GetProductByIdRepository,
    AddProductRepository,
    UpdateProductRepository,
    DeleteProductRepository
} = require("../repositories/product_Operations");

const ProductValidator = require("../validators/product_Validator");
const ProductReadService = require("../services/product_Read_Service");
const ProductWriteService = require("../services/product_Write_Service");

// Repositories
const getAllRepo = new GetAllProductsRepository();
const getByIdRepo = new GetProductByIdRepository();
const addRepo = new AddProductRepository();
const updateRepo = new UpdateProductRepository();
const deleteRepo = new DeleteProductRepository();

// Services
const readService = new ProductReadService({ getAllRepo, getByIdRepo }, ProductValidator);
const writeService = new ProductWriteService({ addRepo, updateRepo, deleteRepo }, ProductValidator);

// Routes
router.get("/", (req, res) => fetchProducts(req, res, readService));
router.get("/:id", (req, res) => fetchProductByIdHandler(req, res, readService));
router.post("/", (req, res) => createProductHandler(req, res, writeService));
router.put("/:id", (req, res) => updateProductHandler(req, res, writeService));
router.delete("/:id", (req, res) => removeProductHandler(req, res, writeService));

module.exports = router;
