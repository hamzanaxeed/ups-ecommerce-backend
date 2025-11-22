const {
	createRequest,
	editRequest,
	deleteRequest,
	assignTechnician,
	declineRequest,
	completeRequest,
	getAllRequests,
	getRequestsByUserId,
	getRequestsByTechnicianId,
} = require("../models/service_Request_Model");

// Create Request
async function createServiceRequest(req, res) {
	try {
		const { user_Id, slot_id, request_date, service_id, description } = req.body;

		if (!user_Id || !slot_id || !request_date || !service_id) {
			return res.status(400).json({
				error: "user_Id, slot_id, request_date, and service_id are required",
			});
		}

		const result = await createRequest({
			user_Id,
			slot_id,
			request_date,
			service_id,
			description,
		});

		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		return res.status(201).json({ message: "Request created", request: result });
	} catch (err) {
		console.error("Error creating request:", err.message || err);
		return res.status(500).json({ error: "Failed to create request" });
	}
}

// Edit Request
async function updateServiceRequest(req, res) {
	try {
		const { request_id } = req.params;
		const { user_Id, slot_id, request_date, service_id, description } = req.body;

		if (!request_id) {
			return res.status(400).json({ error: "Request ID required" });
		}

		const result = await editRequest({
			request_id,
			user_Id,
			slot_id,
			request_date,
			service_id,
			description,
		});

		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		return res.json({ message: "Request updated", request: result });
	} catch (err) {
		console.error("Error updating request:", err.message || err);
		return res.status(500).json({ error: "Failed to update request" });
	}
}

// Delete Request
async function removeServiceRequest(req, res) {
	try {
		const { request_id } = req.params;

		if (!request_id) {
			return res.status(400).json({ error: "Request ID required" });
		}

		const result = await deleteRequest(request_id);

		// Check if result is null or undefined
		if (!result) {
			return res.status(404).json({ error: "Request not found or cannot be deleted" });
		}

		// Check for Supabase error in result
		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		return res.json({ message: "Request deleted", result });
	} catch (err) {
		console.error("Error deleting request:", err.message || err);
		return res.status(500).json({ error: "Failed to delete request" });
	}
}

// Assign Technician
async function assignTechnicianToRequest(req, res) {
	try {
		const { request_id } = req.params;
		const { technician_id } = req.body;

		if (!request_id || !technician_id) {
			return res.status(400).json({ error: "Request ID and Technician ID required" });
		}

		const result = await assignTechnician(request_id, technician_id);

		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		return res.json({ message: "Technician assigned", result });
	} catch (err) {
		console.error("Error assigning technician:", err.message || err);
		return res.status(500).json({ error: "Failed to assign technician" });
	}
}

// Decline Request
async function declineServiceRequest(req, res) {
	try {
		const { request_id } = req.params;

		if (!request_id) {
			return res.status(400).json({ error: "Request ID required" });
		}

		const result = await declineRequest(request_id);

		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		return res.json({ message: "Request declined", result });
	} catch (err) {
		console.error("Error declining request:", err.message || err);
		return res.status(500).json({ error: "Failed to decline request" });
	}
}

// Complete Request
async function completeServiceRequest(req, res) {
	try {
		const { request_id } = req.params;

		if (!request_id) {
			return res.status(400).json({ error: "Request ID required" });
		}

		const result = await completeRequest(request_id);

		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		return res.json({ message: "Request completed", result });
	} catch (err) {
		console.error("Error completing request:", err.message || err);
		return res.status(500).json({ error: "Failed to complete request" });
	}
}

// Get All Requests
async function fetchAllRequests(req, res) {
	try {
		const result = await getAllRequests();

		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		return res.json({ requests: result });
	} catch (err) {
		console.error("Error fetching all requests:", err.message || err);
		return res.status(500).json({ error: "Failed to fetch all requests" });
	}
}

// Get Requests by User
async function fetchRequestsByUser(req, res) {
	try {
		const { user_Id } = req.params;

		if (!user_Id) {
			return res.status(400).json({ error: "User ID required" });
		}

		const result = await getRequestsByUserId(user_Id);

		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		return res.json({ requests: result });
	} catch (err) {
		console.error("Error fetching requests by user:", err.message || err);
		return res.status(500).json({ error: "Failed to fetch requests by user" });
	}
}

// Get Requests by Technician
async function fetchRequestsByTechnician(req, res) {
	try {
		const { technician_id } = req.params;

		if (!technician_id) {
			return res.status(400).json({ error: "Technician ID required" });
		}

		const result = await getRequestsByTechnicianId(technician_id);

		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		return res.json({ requests: result });
	} catch (err) {
		console.error("Error fetching requests by technician:", err.message || err);
		return res.status(500).json({ error: "Failed to fetch requests by technician" });
	}
}

module.exports = {
	createServiceRequest,
	updateServiceRequest,
	removeServiceRequest,
	assignTechnicianToRequest,
	declineServiceRequest,
	completeServiceRequest,
	fetchAllRequests,
	fetchRequestsByUser,
	fetchRequestsByTechnician,
};
