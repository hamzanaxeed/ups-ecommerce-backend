const express = require("express");
const router = express.Router();
const {
	createServiceRequest,
	updateServiceRequest,
	removeServiceRequest,
	assignTechnicianToRequest,
	declineServiceRequest,
	completeServiceRequest,
	fetchAllRequests,
	fetchRequestsByUser,
	fetchRequestsByTechnician,
} = require("../controllers/service_Request_Controller");

// GET /api/service-requests -> get all requests
router.get("/", fetchAllRequests);

// POST /api/service-requests -> create request
router.post("/", createServiceRequest);

// GET /api/service-requests/user/:user_Id -> get requests by user
router.get("/user/:user_Id", fetchRequestsByUser);

// GET /api/service-requests/technician/:technician_id -> get requests by technician
router.get("/technician/:technician_id", fetchRequestsByTechnician);

// PUT /api/service-requests/:request_id -> update request
router.put("/:request_id", updateServiceRequest);

// DELETE /api/service-requests/:request_id -> delete request
router.delete("/:request_id", removeServiceRequest);

// PATCH /api/service-requests/:request_id/assign -> assign technician
router.patch("/:request_id/assign", assignTechnicianToRequest);

// PATCH /api/service-requests/:request_id/decline -> decline request
router.patch("/:request_id/decline", declineServiceRequest);

// PATCH /api/service-requests/:request_id/complete -> complete request
router.patch("/:request_id/complete", completeServiceRequest);

module.exports = router;
