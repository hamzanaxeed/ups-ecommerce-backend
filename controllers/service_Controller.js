const {
  getAllServices,
  getAvailableServices,
  getServiceById,
  createService,
  editService,
  deleteService,
} = require("../models/service_Model");

// ================================
// 1️⃣ Fetch all services (Admin)
// ================================
async function fetchAllServices(req, res) {
  try {
    const services = await getAllServices();

    // Normalize response
    if (services && typeof services === "object" && !Array.isArray(services)) {
      if (services.services) return res.json({ services: services.services });
      if (services.data) return res.json({ services: services.data });
      return res.json({ services });
    }

    return res.json({ services });
  } catch (err) {
    console.error("Error fetching all services:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch services" });
  }
}

// =====================================
// 2️⃣ Fetch available services (Customer)
// =====================================
async function fetchAvailableServices(req, res) {
  try {
    const services = await getAvailableServices();

    // Normalize response
    if (services && typeof services === "object" && !Array.isArray(services)) {
      if (services.services) return res.json({ services: services.services });
      if (services.data) return res.json({ services: services.data });
      return res.json({ services });
    }

    return res.json({ services });
  } catch (err) {
    console.error("Error fetching available services:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch available services" });
  }
}

// ================================
// 2️⃣.5 Fetch service by ID
// ================================
async function fetchServiceById(req, res) {
  try {
    const serviceId = req.params.id;

    if (!serviceId) return res.status(400).json({ error: "Service id required" });

    const service = await getServiceById(serviceId);

    if (!service) return res.status(404).json({ error: "Service not found" });

    return res.json({ service });
  } catch (err) {
    console.error("Error fetching service by id:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch service" });
  }
}

// ================================
// 3️⃣ Create new service (Admin)
// ================================
async function addService(req, res) {
  try {
    const { service_name, description, price, duration, availability } = req.body;

    // Validation
    if (!service_name || price === undefined || !duration) {
      return res.status(400).json({
        error: "service_name, price, and duration are required",
      });
    }

    const serviceData = {
      service_name,
      description: description || null,
      price,
      duration,
      availability: availability !== undefined ? availability : true,
    };

    const service = await createService(serviceData);

    if (!service) return res.status(400).json({ error: "Failed to create service" });

    return res.status(201).json({ message: "Service created", service });
  } catch (err) {
    console.error("Error creating service:", err.message || err);
    return res.status(500).json({ error: "Failed to create service" });
  }
}

// ================================
// 4️⃣ Edit existing service (Admin)
// ================================
async function updateService(req, res) {
  try {
    const serviceId = req.params.id;
    const { service_name, description, price, duration, availability } = req.body;

    // Validation
    if (!serviceId) return res.status(400).json({ error: "Service id required" });
    if (!service_name || price === undefined || !duration) {
      return res.status(400).json({
        error: "service_name, price, and duration are required",
      });
    }

    const serviceData = {
      service_name,
      description: description || null,
      price,
      duration,
      availability: availability !== undefined ? availability : true,
    };

    const service = await editService(serviceId, serviceData);

    if (!service) return res.status(404).json({ error: "Service not found" });

    return res.json({ message: "Service updated", service });
  } catch (err) {
    console.error("Error updating service:", err.message || err);
    return res.status(500).json({ error: "Failed to update service" });
  }
}

// ================================
// 5️⃣ Delete service (Admin)
// ================================
async function removeService(req, res) {
  try {
    const serviceId = req.params.id;

    if (!serviceId) return res.status(400).json({ error: "Service id required" });

    const result = await deleteService(serviceId);

    if (!result) return res.status(404).json({ error: "Service not found" });

    return res.json({ message: "Service deleted" });
  } catch (err) {
    console.error("Error deleting service:", err.message || err);
    return res.status(500).json({ error: "Failed to delete service" });
  }
}

module.exports = {
  fetchAllServices,
  fetchAvailableServices,
  fetchServiceById,
  addService,
  updateService,
  removeService,
};
