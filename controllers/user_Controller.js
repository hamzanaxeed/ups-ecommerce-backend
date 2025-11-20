const bcrypt = require("bcrypt");
const {
	createCustomer,
	editActiveCustomer,
	deactivateCustomer,
	getAllCustomers,
	getAllActiveCustomers,
	getActiveCustomer,
} = require("../models/user_Model");

// Create new customer
async function registerCustomer(req, res) {
	try {
		const { name, email, username, password, phone_Number } = req.body;

		if (!name || !email || !username || !password || !phone_Number) {
			return res.status(400).json({ error: "All fields are required" });
		}

		// Hash password with bcrypt
		const saltRounds = 10;
		const password_hash = await bcrypt.hash(password, saltRounds);

		const customer = await createCustomer({
			name,
			email,
			username,
			password_hash,
			phone_Number,
		});

		return res.status(201).json({ message: "Customer created", customer });
	} catch (err) {
		console.error("Error creating customer:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to create customer" });
	}
}

// Edit active customer
async function updateCustomer(req, res) {
	try {
		const { user_Id } = req.params;
		const { name, email, username, phone_Number } = req.body;

		if (!user_Id) {
			return res.status(400).json({ error: "User ID required" });
		}

		const updated = await editActiveCustomer({
			user_Id,
			name,
			email,
			username,
			phone_Number,
		});

		return res.json({ message: "Customer updated", customer: updated });
	} catch (err) {
		console.error("Error updating customer:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to update customer" });
	}
}

// Deactivate customer
async function deactivateCustomerHandler(req, res) {
	try {
		const { user_Id } = req.params;

		if (!user_Id) {
			return res.status(400).json({ error: "User ID required" });
		}

		const result = await deactivateCustomer(user_Id);
		return res.json({ message: "Customer deactivated", result });
	} catch (err) {
		console.error("Error deactivating customer:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to deactivate customer" });
	}
}

// Get all customers
async function fetchAllCustomers(req, res) {
	try {
		const customers = await getAllCustomers();
		return res.json({ customers });
	} catch (err) {
		console.error("Error fetching all customers:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to fetch customers" });
	}
}

// Get all active customers
async function fetchAllActiveCustomers(req, res) {
	try {
		const customers = await getAllActiveCustomers();
		return res.json({ customers });
	} catch (err) {
		console.error("Error fetching active customers:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to fetch active customers" });
	}
}

// Get active customer by ID
async function fetchActiveCustomer(req, res) {
	try {
		const { user_Id } = req.params;

		if (!user_Id) {
			return res.status(400).json({ error: "User ID required" });
		}

		const customer = await getActiveCustomer(user_Id);

		if (!customer) {
			return res.status(404).json({ error: "Customer not found" });
		}

		return res.json({ customer });
	} catch (err) {
		console.error("Error fetching active customer:", err.message || err);
		return res.status(500).json({ error: err.message || "Failed to fetch customer" });
	}
}

module.exports = {
	registerCustomer,
	updateCustomer,
	deactivateCustomerHandler,
	fetchAllCustomers,
	fetchAllActiveCustomers,
	fetchActiveCustomer,
};
