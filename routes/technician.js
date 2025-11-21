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

// POST /api/technician/register -> create technician
router.post("/register", registerTechnician);

// GET /api/technician -> get all technicians
router.get("/", fetchAllTechnicians);

// GET /api/technician/active -> get all active technicians
router.get("/active", fetchAllActiveTechnicians);

// GET /api/technician/active/:user_Id -> get active technician by ID
router.get("/active/:user_Id", fetchActiveTechnician);

// PUT /api/technician/:user_Id -> update technician
router.put("/:user_Id", updateTechnician);

// DELETE /api/technician/:user_Id -> deactivate technician
router.delete("/:user_Id", deactivateTechnicianHandler);

module.exports = router;
