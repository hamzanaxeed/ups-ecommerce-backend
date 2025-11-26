const express = require("express");
const router = express.Router();

const {
    fetchResourcesForCustomers,
    fetchResourcesForTechnicians,
    fetchAllResources,
    createResourceHandler,
    updateResource,
    removeResource
} = require("../controllers/resource_Controller");

const {
    GetResourcesForCustomersRepository,
    GetResourcesForTechniciansRepository,
    GetAllResourcesRepository,
    CreateResourceRepository,
    EditResourceRepository,
    DeleteResourceRepository
} = require("../repositories/resource_Operations");

const ResourceReadService = require("../services/resource_Read_Service");
const ResourceWriteService = require("../services/resource_Write_Service");

// Repositories
const customerRepo = new GetResourcesForCustomersRepository();
const technicianRepo = new GetResourcesForTechniciansRepository();
const allRepo = new GetAllResourcesRepository();
const createRepo = new CreateResourceRepository();
const editRepo = new EditResourceRepository();
const deleteRepo = new DeleteResourceRepository();

// Services
const readService = new ResourceReadService({ customerRepo, technicianRepo, allRepo });
const writeService = new ResourceWriteService({ createRepo, editRepo, deleteRepo });

// Routes
router.get("/customers", (req, res) => fetchResourcesForCustomers(req, res, readService));
router.get("/technicians", (req, res) => fetchResourcesForTechnicians(req, res, readService));
router.get("/all", (req, res) => fetchAllResources(req, res, readService));

router.post("/", (req, res) => createResourceHandler(req, res, writeService));
router.put("/:resource_id", (req, res) => updateResource(req, res, writeService));
router.delete("/:resource_id", (req, res) => removeResource(req, res, writeService));

module.exports = router;
