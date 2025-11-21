const {
	getResourcesForCustomers,
	getResourcesForTechnicians,
	getAllResources,
	deleteResource,
	editResource,
	createResource,
} = require("../models/resources_Model");

// Fetch resources for customers
async function fetchResourcesForCustomers(req, res) {
	try {
		const resources = await getResourcesForCustomers();
		if (resources.error) {
			return res.status(400).json({ error: resources.error });
		}
		return res.json({ resources });
	} catch (err) {
		console.error("Error fetching resources for customers:", err.message || err);
		return res.status(500).json({ error: "Failed to fetch resources for customers" });
	}
}

// Fetch resources for technicians
async function fetchResourcesForTechnicians(req, res) {
	try {
		const resources = await getResourcesForTechnicians();
		if (resources.error) {
			return res.status(400).json({ error: resources.error });
		}
		return res.json({ resources });
	} catch (err) {
		console.error("Error fetching resources for technicians:", err.message || err);
		return res.status(500).json({ error: "Failed to fetch resources for technicians" });
	}
}

// Fetch all resources (admin)
async function fetchAllResources(req, res) {
	try {
		const resources = await getAllResources();
		if (resources.error) {
			return res.status(400).json({ error: resources.error });
		}
		return res.json({ resources });
	} catch (err) {
		console.error("Error fetching all resources:", err.message || err);
		return res.status(500).json({ error: "Failed to fetch all resources" });
	}
}

// Delete resource
async function removeResource(req, res) {
	try {
		const { resource_id } = req.params;
		if (!resource_id) {
			return res.status(400).json({ error: "Resource ID required" });
		}

		const result = await deleteResource(resource_id);
		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		return res.json(result);
	} catch (err) {
		console.error("Error deleting resource:", err.message || err);
		return res.status(500).json({ error: "Failed to delete resource" });
	}
}

// Edit resource
async function updateResource(req, res) {
	try {
		const { resource_id } = req.params;
		const { title, access_level, file_URL, description } = req.body;

		if (!resource_id) {
			return res.status(400).json({ error: "Resource ID required" });
		}

		const result = await editResource({ resource_id, title, access_level, file_URL, description });
		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		return res.json(result);
	} catch (err) {
		console.error("Error updating resource:", err.message || err);
		return res.status(500).json({ error: "Failed to update resource" });
	}
}

// Create resource
async function createResourceHandler(req, res) {
	try {
		const { title, uploaded_by, file_URL, description, access_level } = req.body;

		if (!title || !uploaded_by || !file_URL || !access_level) {
			return res.status(400).json({
				error: "title, uploaded_by, file_URL, and access_level are required",
			});
		}

		const result = await createResource({ title, uploaded_by, file_URL, description, access_level });
		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		return res.status(201).json(result);
	} catch (err) {
		console.error("Error creating resource:", err.message || err);
		return res.status(500).json({ error: "Failed to create resource" });
	}
}

module.exports = {
	fetchResourcesForCustomers,
	fetchResourcesForTechnicians,
	fetchAllResources,
	removeResource,
	updateResource,
	createResourceHandler,
};
