const express = require("express");
const router = express.Router();
const {
    fetchAllFeedback,
    fetchFeedbackByCustomer,
    fetchFeedbackForOrder,
    addFeedback,
    removeFeedback,
} = require("../controllers/feedbackController");

router.get("/", fetchAllFeedback);
router.post("/", addFeedback);
router.get("/customer/:customerId", fetchFeedbackByCustomer);
router.get("/order/:orderId", fetchFeedbackForOrder);
router.delete("/:id", removeFeedback);

module.exports = router;