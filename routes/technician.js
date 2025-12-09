const express = require("express");
const router = express.Router();
const {
	registerTechnician,
	deactivateTechnicianHandler,
	updateTechnician,
	fetchActiveTechnician,
	fetchAllActiveTechnicians,
	fetchAllTechnicians,
} = require("../controllers/technician_Controller");

const {
	AddTechnicianRepository,
	EditTechnicianRepository,
	DeactivateTechnicianRepository,
	GetActiveTechnicianRepository,
	GetAllActiveTechniciansRepository,
	GetAllTechniciansRepository,
} = require("../repositories/technician_Operations");

const TechnicianReadService = require("../services/technician_Read_Service");
const TechnicianWriteService = require("../services/technician_Write_Service");
const TechnicianValidator = require("../validators/technicianValidator");

// Repositories (factory method)
const { createTechnicianRepositories } = require("../factories/repositoryFactory");
const { addRepo, editRepo, deactivateRepo, getActiveRepo, getAllActiveRepo, getAllRepo } = createTechnicianRepositories();

// Services
const readService = new TechnicianReadService(getActiveRepo, getAllRepo, getAllActiveRepo, TechnicianValidator);
const writeService = new TechnicianWriteService({ addRepo, editRepo, deactivateRepo }, TechnicianValidator);

// POST /api/technician/register -> create technician
router.post("/register", (req, res) => registerTechnician(req, res, writeService));

// GET /api/technician -> get all technicians
router.get("/", (req, res) => fetchAllTechnicians(req, res, readService));

// GET /api/technician/active -> get all active technicians
router.get("/active", (req, res) => fetchAllActiveTechnicians(req, res, readService));

// GET /api/technician/active/:user_Id -> get active technician by ID
router.get("/active/:user_Id", (req, res) => fetchActiveTechnician(req, res, readService));

// PUT /api/technician/:user_Id -> update technician
router.put("/:user_Id", (req, res) => updateTechnician(req, res, writeService));

// DELETE /api/technician/:user_Id -> deactivate technician
router.delete("/:user_Id", (req, res) => deactivateTechnicianHandler(req, res, writeService));

module.exports = router;
