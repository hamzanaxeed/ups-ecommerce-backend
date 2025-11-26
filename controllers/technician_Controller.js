const TechnicianValidator = require("../validators/technicianValidator");

// Create technician
async function registerTechnician(req, res, writeService) {
	try {
		const { name, email, username, password, phone_Number } = req.body;

		TechnicianValidator.validateTechnicianData({ name, email, username, password, phone_Number });

		const response = await writeService.create(req.body);
	
		return res.status(response.status).json(response.data);
	} catch (err) {
		console.error("Error creating technician:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to create technician" });
	}
}

// Deactivate technician
async function deactivateTechnicianHandler(req, res, writeService) {
	try {
		const { user_Id } = req.params;

		if (!user_Id) {
			return res.status(400).json({ error: "User ID required" });
		}

		const response = await writeService.deactivate(user_Id);
		return res.status(response.status).json({ message: "Technician deactivated", ...response.data });
	} catch (err) {
		console.error("Error deactivating technician:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to deactivate technician" });
	}
}

// Edit active technician
async function updateTechnician(req, res, writeService) {
	try {
		const { user_Id } = req.params;
		const { name, email, username, phone_Number, password } = req.body;

		if (!user_Id) {
			return res.status(400).json({ error: "User ID required" });
		}

		TechnicianValidator.validateTechnicianData({ name, email, username, password, phone_Number }, { allowPassword: true });

		const response = await writeService.update(user_Id, req.body);
		return res.status(response.status).json(response.data);
	} catch (err) {
		console.error("Error updating technician:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to update technician" });
	}
}

// Get active technician by ID
async function fetchActiveTechnician(req, res, readService) {
	try {
		const { user_Id } = req.params;

		if (!user_Id) {
			return res.status(400).json({ error: "User ID required" });
		}

		const response = await readService.getActive(user_Id);
		return res.status(response.status).json(response.data);
	} catch (err) {
		console.error("Error fetching technician:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to fetch technician" });
	}
}

// Get all active technicians
async function fetchAllActiveTechnicians(req, res, readService) {
	try {
		const response = await readService.getAllActive();
		return res.status(response.status).json(response.data);
	} catch (err) {
		console.error("Error fetching all active technicians:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to fetch active technicians" });
	}
}

// Get all technicians
async function fetchAllTechnicians(req, res, readService) {
	try {
		const response = await readService.getAll();
		return res.status(response.status).json(response.data);
	} catch (err) {
		console.error("Error fetching all technicians:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to fetch technicians" });
	}
}

module.exports = {
	registerTechnician,
	deactivateTechnicianHandler,
	updateTechnician,
	fetchActiveTechnician,
	fetchAllActiveTechnicians,
	fetchAllTechnicians,
};
