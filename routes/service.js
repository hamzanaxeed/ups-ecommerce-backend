// src/routes/serviceRoutes.js
const express = require("express");
const router = express.Router();

const {
    fetchServices,
    fetchAvailableServices,
    fetchServiceById,
    createService,
    modifyService,
    removeService
} = require("../controllers/serviceController");

const {
    CreateServiceRepository,
    UpdateServiceRepository,
    DeleteServiceRepository,
    GetAllServicesRepository,
    GetServiceByIdRepository,
    GetAvailableServicesRepository
} = require("../repositories/serviceRepository");

const ServiceReadService = require("../services/serviceReadService");
const ServiceWriteService = require("../services/serviceWriteService");

// Initialize Repositories
const createRepo = new CreateServiceRepository();
const updateRepo = new UpdateServiceRepository();
const deleteRepo = new DeleteServiceRepository();
const allRepo = new GetAllServicesRepository();
const idRepo = new GetServiceByIdRepository();
const availableRepo = new GetAvailableServicesRepository();

// Initialize Services
const readService = new ServiceReadService({ allRepo, idRepo, availableRepo });
const writeService = new ServiceWriteService({ createRepo, updateRepo, deleteRepo });

// Routes
router.get("/", (req, res) => fetchServices(req, res, readService));
router.get("/available", (req, res) => fetchAvailableServices(req, res, readService));
router.get("/:id", (req, res) => fetchServiceById(req, res, readService));

router.post("/", (req, res) => createService(req, res, writeService));
router.put("/:id", (req, res) => modifyService(req, res, writeService));
router.delete("/:id", (req, res) => removeService(req, res, writeService));

module.exports = router;