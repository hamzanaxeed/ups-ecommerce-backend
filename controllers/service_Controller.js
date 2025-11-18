const { addService, updateService, deleteService, getAllServices, getServiceById, getAvailableServices } = require("../models/service_Model");

// Fetch all services
async function fetchServices(req, res) {
	try {
		const services = await getAllServices();
		return res.json({ services });
	} catch (err) {
		console.error("Error fetching services:", err.message || err);
		return res.status(500).json({ error: "Failed to fetch services" });
	}
}

// Fetch available services only
async function fetchAvailableServices(req, res) {
	try {
		const services = await getAvailableServices(true); 
	
		return res.json({ services });
	} catch (err) {
		console.error("Error fetching available services:", err.message || err);
		return res.status(500).json({ error: "Failed to fetch available services" });
	}
}

// Fetch service by id
async function fetchServiceById(req, res) {
	try {
		const id = req.params.id;
		if (!id) return res.status(400).json({ error: "Service id required" });

		const service = await getServiceById(id);
		if (!service) return res.status(404).json({ error: "Service not found" });

		return res.json({ service });
	} catch (err) {
		console.error("Error fetching service by id:", err.message || err);
		return res.status(500).json({ error: "Failed to fetch service" });
	}
}

// Create service
async function createService(req, res) {
	try {
		const { service_name, description, price, duration, availability } = req.body;
		if (!service_name || price == null) {
			return res.status(400).json({ error: "service_name and price are required" });
		}

		const created = await addService({ service_name, description, price, duration, availability });
		return res.status(201).json({ message: "Service created", service: created });
	} catch (err) {
		console.error("Error creating service:", err.message || err);
		return res.status(500).json({ error: "Failed to create service" });
	}
}

// Update service
async function modifyService(req, res) {
	try {
		const id = req.params.id;
		const { service_name, description, price, duration, availability } = req.body;
		if (!id) return res.status(400).json({ error: "Service id required" });

		const updated = await updateService({ service_id: id, service_name, description, price, duration, availability });
		return res.json({ message: "Service updated", service: updated });
	} catch (err) {
		console.error("Error updating service:", err.message || err);
		return res.status(500).json({ error: "Failed to update service" });
	}
}

// Delete service
async function removeService(req, res) {
	try {
		const id = req.params.id;
		if (!id) return res.status(400).json({ error: "Service id required" });

		await deleteService(id);
		return res.json({ message: "Service deleted" });
	} catch (err) {
		console.error("Error deleting service:", err.message || err);
		return res.status(500).json({ error: "Failed to delete service" });
	}
}

module.exports = { 
	fetchServices, 
	fetchAvailableServices, // <-- new function added
	fetchServiceById, 
	createService, 
	modifyService, 
	removeService 
};
