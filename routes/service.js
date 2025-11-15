const express = require("express");
const router = express.Router();
const {
  fetchAllServices,
  fetchAvailableServices,
  fetchServiceById,
  addService,
  updateService,
  removeService,
} = require("../controllers/service_Controller");

// GET /api/services/all -> returns all services (Admin)
router.get("/all", fetchAllServices);

// GET /api/services/available -> returns available services (Customer)
router.get("/available", fetchAvailableServices);

// POST /api/services -> creates a new service (Admin)
router.post("/", addService);

// GET /api/services/:id -> returns a single service by id
router.get("/:id", fetchServiceById);

// PUT /api/services/:id -> updates a service (Admin)
router.put("/:id", updateService);

// DELETE /api/services/:id -> deletes a service (Admin)
router.delete("/:id", removeService);

module.exports = router;
