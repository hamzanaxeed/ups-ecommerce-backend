const express = require("express");
const router = express.Router();
const {
	fetchResourcesForCustomers,
	fetchResourcesForTechnicians,
	fetchAllResources,
	removeResource,
	updateResource,
	createResourceHandler,
} = require("../controllers/resources_Controller");

// GET /api/resources/customers -> get resources for customers
router.get("/customers", fetchResourcesForCustomers);

// GET /api/resources/technicians -> get resources for technicians
router.get("/technicians", fetchResourcesForTechnicians);

// GET /api/resources/all -> get all resources (admin)
router.get("/all", fetchAllResources);

// POST /api/resources -> create resource
router.post("/", createResourceHandler);

// PUT /api/resources/:resource_id -> update resource
router.put("/:resource_id", updateResource);

// DELETE /api/resources/:resource_id -> delete resource
router.delete("/:resource_id", removeResource);

module.exports = router;
