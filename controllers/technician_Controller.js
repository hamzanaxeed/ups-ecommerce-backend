const {
	createTechnician,
	deactivateTechnician,
	editActiveTechnician,
	getActiveTechnician,
	getAllActiveTechnicians,
	getAllTechnicians,
} = require("../models/technician_Model");

// Create technician
async function registerTechnician(req, res) {
	try {
		const { name, email, username, password, phone_Number } = req.body;

		if (!name || !email || !username || !password || !phone_Number) {
			return res.status(400).json({ error: "All fields are required" });
		}

		const technician = await createTechnician({
			name,
			email,
			username,
			password,
			phone_Number,
		});

		if (technician.error) {
			return res.status(400).json({ error: technician.error });
		}

		return res.status(201).json({ message: "Technician created", technician });
	} catch (err) {
		console.error("Error creating technician:", err.message || err);
		return res.status(500).json({ error: "Failed to create technician" });
	}
}

// Deactivate technician
async function deactivateTechnicianHandler(req, res) {
	try {
		const { user_Id } = req.params;

		if (!user_Id) {
			return res.status(400).json({ error: "User ID required" });
		}

		const result = await deactivateTechnician(user_Id);

		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		return res.json({ message: "Technician deactivated", result });
	} catch (err) {
		console.error("Error deactivating technician:", err.message || err);
		return res.status(500).json({ error: "Failed to deactivate technician" });
	}
}

// Edit active technician
async function updateTechnician(req, res) {
	try {
		const { user_Id } = req.params;
		const { name, email, username, phone_Number } = req.body;

		if (!user_Id) {
			return res.status(400).json({ error: "User ID required" });
		}

		const result = await editActiveTechnician({
			user_Id,
			name,
			email,
			username,
			phone_Number,
		});

		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		return res.json({ message: "Technician updated", technician: result });
	} catch (err) {
		console.error("Error updating technician:", err.message || err);
		return res.status(500).json({ error: "Failed to update technician" });
	}
}

// Get active technician by ID
async function fetchActiveTechnician(req, res) {
	try {
		const { user_Id } = req.params;

		if (!user_Id) {
			return res.status(400).json({ error: "User ID required" });
		}

		const technician = await getActiveTechnician(user_Id);

		if (technician.error) {
			return res.status(404).json({ error: technician.error });
		}

		if (!technician) {
			return res.status(404).json({ error: "Technician not found" });
		}

		return res.json({ technician });
	} catch (err) {
		console.error("Error fetching technician:", err.message || err);
		return res.status(500).json({ error: "Failed to fetch technician" });
	}
}

// Get all active technicians
async function fetchAllActiveTechnicians(req, res) {
	try {
		const technicians = await getAllActiveTechnicians();

		if (technicians.error) {
			return res.status(400).json({ error: technicians.error });
		}

		return res.json({ technicians });
	} catch (err) {
		console.error("Error fetching all active technicians:", err.message || err);
		return res.status(500).json({ error: "Failed to fetch active technicians" });
	}
}

// Get all technicians
async function fetchAllTechnicians(req, res) {
	try {
		const technicians = await getAllTechnicians();

		if (technicians.error) {
			return res.status(400).json({ error: technicians.error });
		}

		return res.json({ technicians });
	} catch (err) {
		console.error("Error fetching all technicians:", err.message || err);
		return res.status(500).json({ error: "Failed to fetch technicians" });
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
