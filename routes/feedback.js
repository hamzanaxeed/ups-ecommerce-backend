const express = require("express");
const router = express.Router();
const {
    fetchAllFeedback,
    fetchFeedbackByCustomer,
    fetchFeedbackForOrder,
    addFeedback,
    removeFeedback,
} = require("../controllers/feedback_Controller");
const {
    GetAllFeedbackRepository,
    GetFeedbackByCustomerRepository,
    GetFeedbackByOrderRepository,
    CreateFeedbackRepository,
    DeleteFeedbackRepository,
} = require("../repositories/feedback_Operations");
const FeedbackService = require("../services/feedback_Service");

const allRepo = new GetAllFeedbackRepository();
const byCustomerRepo = new GetFeedbackByCustomerRepository();
const byOrderRepo = new GetFeedbackByOrderRepository();
const createRepo = new CreateFeedbackRepository();
const deleteRepo = new DeleteFeedbackRepository();
const service = new FeedbackService({ allRepo, byCustomerRepo, byOrderRepo, createRepo, deleteRepo });

router.get("/", (req, res) => fetchAllFeedback(req, res, service));
router.post("/", (req, res) => addFeedback(req, res, service));
router.get("/customer/:customerId", (req, res) => fetchFeedbackByCustomer(req, res, service));
router.get("/order/:orderId", (req, res) => fetchFeedbackForOrder(req, res, service));
router.delete("/:id", (req, res) => removeFeedback(req, res, service));

module.exports = router;