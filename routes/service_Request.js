const express = require("express");
const router = express.Router();
const {
    fetchAllRequests,
    fetchRequestsByUser,
    fetchRequestsByTechnician,
    createServiceRequest,
    updateServiceRequest,
    removeServiceRequest,
    assignTechnicianToRequest,
    declineServiceRequest,
    completeServiceRequest
} = require("../controllers/serviceRequestController");

const {
    CreateRequestRepository,
    EditRequestRepository,
    DeleteRequestRepository,
    AssignTechnicianRepository,
    DeclineRequestRepository,
    CompleteRequestRepository,
    GetAllRequestsRepository,
    GetRequestsByUserRepository,
    GetRequestsByTechnicianRepository
} = require("../repositories/serviceRequestRepository");

const ServiceRequestReadService = require("../services/serviceRequestReadService");
const ServiceRequestWriteService = require("../services/serviceRequestWriteService");

// Repositories
const createRepo = new CreateRequestRepository();
const editRepo = new EditRequestRepository();
const deleteRepo = new DeleteRequestRepository();
const assignRepo = new AssignTechnicianRepository();
const declineRepo = new DeclineRequestRepository();
const completeRepo = new CompleteRequestRepository();
const allRepo = new GetAllRequestsRepository();
const userRepo = new GetRequestsByUserRepository();
const technicianRepo = new GetRequestsByTechnicianRepository();

// Services
const readService = new ServiceRequestReadService({ allRepo, userRepo, technicianRepo });
const writeService = new ServiceRequestWriteService({ createRepo, editRepo, deleteRepo, assignRepo, declineRepo, completeRepo });

// Routes
router.get("/", (req, res) => fetchAllRequests(req, res, readService));
router.get("/user/:user_Id", (req, res) => fetchRequestsByUser(req, res, readService));
router.get("/technician/:technician_id", (req, res) => fetchRequestsByTechnician(req, res, readService));

router.post("/", (req, res) => createServiceRequest(req, res, writeService));
router.put("/:request_id", (req, res) => updateServiceRequest(req, res, writeService));
router.delete("/:request_id", (req, res) => removeServiceRequest(req, res, writeService));

router.patch("/:request_id/assign", (req, res) => assignTechnicianToRequest(req, res, writeService));
router.patch("/:request_id/decline", (req, res) => declineServiceRequest(req, res, writeService));
router.patch("/:request_id/complete", (req, res) => completeServiceRequest(req, res, writeService));

module.exports = router;
