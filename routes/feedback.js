const express = require("express");
const router = express.Router();
const {
  fetchAllFeedback,
  fetchFeedbackByCustomer,
  fetchFeedbackForOrder,
  addFeedback,
  removeFeedback,
} = require("../controllers/feedback_Controller");

// GET /api/feedback -> returns all feedback (Admin)
router.get("/", fetchAllFeedback);

// POST /api/feedback -> creates new feedback
router.post("/", addFeedback);

// GET /api/feedback/customer/:customerId -> returns feedback for a specific customer
router.get("/customer/:customerId", fetchFeedbackByCustomer);

// GET /api/feedback/order/:orderId -> returns feedback for a specific order
router.get("/order/:orderId", fetchFeedbackForOrder);

// DELETE /api/feedback/:id -> deletes feedback
router.delete("/:id", removeFeedback);

module.exports = router;
