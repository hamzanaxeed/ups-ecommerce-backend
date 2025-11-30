const UserValidator = require("../validators/userValidator");

// Create new customer
async function registerCustomer(req, res, writeService) {
	try {
		const { name, email, username, password, phone_Number } = req.body;

		if (!name || !email || !username || !password || !phone_Number) {
			return res.status(400).json({ error: "All fields are required" });
		}

		UserValidator.validateUserData({ name, email, username, password, phone_Number });
		const response = await writeService.create({ name, email, username, password, phone_Number });
		return res.status(response.status).json({ message: "Customer created", ...response.data });
	} catch (err) {
		console.error("Error creating customer:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to create customer" });
	}
}

// Edit active customer
async function updateCustomer(req, res, writeService) {
	try {
		const { user_Id } = req.params;
		const { name, email, username, phone_Number } = req.body;

		if (!user_Id) {
			return res.status(400).json({ error: "User ID required" });
		}

		UserValidator.validateUserId(user_Id);
		UserValidator.validateUserData({ name, email, username, phone_Number }, { allowPassword: true });
		const response = await writeService.update(user_Id, { name, email, username, phone_Number });
		return res.status(response.status).json({ message: "Customer updated", ...response.data });
	} catch (err) {
		console.error("Error updating customer:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to update customer" });
	}
}

// Deactivate customer
async function deactivateCustomerHandler(req, res, writeService) {
	try {
		const { user_Id } = req.params;

		if (!user_Id) {
			return res.status(400).json({ error: "User ID required" });
		}

		UserValidator.validateUserId(user_Id);
		const response = await writeService.deactivate(user_Id);
		return res.status(response.status).json({ message: "Customer deactivated", ...response.data });
	} catch (err) {
		console.error("Error deactivating customer:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to deactivate customer" });
	}
}

// Activate customer
async function activateCustomerHandler(req, res, writeService) {
	try {
		const { user_Id } = req.params;

		if (!user_Id) {
			return res.status(400).json({ error: "User ID required" });
		}

		UserValidator.validateUserId(user_Id);
		const response = await writeService.activate(user_Id);
		console.log("Activation response:", response);
		return res.status(response.status).json({ data: response.data });
	} catch (err) {
		console.error("Error activating customer:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to activate customer" });
	}
}

// Get all customers
async function fetchAllCustomers(req, res, readService) {
	try {
		const response = await readService.getAll();
		return res.status(response.status).json(response.data);
	} catch (err) {
		console.error("Error fetching all customers:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to fetch customers" });
	}
}

// Get all active customers
async function fetchAllActiveCustomers(req, res, readService) {
	try {
		const response = await readService.getAllActive();
		return res.status(response.status).json(response.data);
	} catch (err) {
		console.error("Error fetching active customers:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to fetch active customers" });
	}
}

// Get active customer by ID
async function fetchActiveCustomer(req, res, readService) {
	try {
		const { user_Id } = req.params;

		if (!user_Id) {
			return res.status(400).json({ error: "User ID required" });
		}

		const response = await readService.getActive(user_Id);
		return res.status(response.status).json(response.data);
	} catch (err) {
		console.error("Error fetching active customer:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to fetch customer" });
	}
}

module.exports = {
	registerCustomer,
	updateCustomer,
	deactivateCustomerHandler,
	activateCustomerHandler,
	fetchAllCustomers,
	fetchAllActiveCustomers,
	fetchActiveCustomer,
};
