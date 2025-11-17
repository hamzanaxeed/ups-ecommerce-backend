const express = require("express");
const router = express.Router();
const { fetchServices, fetchAvailableServices, createService, modifyService, removeService } = require("../controllers/service_Controller");

// GET /api/services -> list services
router.get("/", fetchServices);

// POST /api/services -> create service
router.post("/", createService);

// PUT /api/services/:id -> update
router.put("/:id", modifyService);

// DELETE /api/services/:id -> delete
router.delete("/:id", removeService);

router.get("/available", fetchAvailableServices);

module.exports = router;

