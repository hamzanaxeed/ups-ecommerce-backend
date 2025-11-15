const {
  getAllFeedback,
  getFeedbackByCustomer,
  getFeedbackForOrder,
  createFeedback,
  deleteFeedback,
} = require("../models/feedback_Model");

// ================================
// Fetch all feedback (Admin)
// ================================
async function fetchAllFeedback(req, res) {
  try {
    const feedback = await getAllFeedback();

    // Normalize response
    if (feedback && typeof feedback === "object" && !Array.isArray(feedback)) {
      if (feedback.feedback) return res.json({ feedback: feedback.feedback });
      if (feedback.data) return res.json({ feedback: feedback.data });
      return res.json({ feedback });
    }

    return res.json({ feedback });
  } catch (err) {
    console.error("Error fetching all feedback:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch feedback" });
  }
}

// ================================
// Fetch feedback by customer
// ================================
async function fetchFeedbackByCustomer(req, res) {
  try {
    const customerId = req.params.customerId;

    if (!customerId) return res.status(400).json({ error: "Customer id required" });

    const feedback = await getFeedbackByCustomer(customerId);

    // Normalize response
    if (feedback && typeof feedback === "object" && !Array.isArray(feedback)) {
      if (feedback.feedback) return res.json({ feedback: feedback.feedback });
      if (feedback.data) return res.json({ feedback: feedback.data });
      return res.json({ feedback });
    }

    return res.json({ feedback });
  } catch (err) {
    console.error("Error fetching customer feedback:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch customer feedback" });
  }
}

// ================================
// Fetch feedback for order
// ================================
async function fetchFeedbackForOrder(req, res) {
  try {
    const orderId = req.params.orderId;

    if (!orderId) return res.status(400).json({ error: "Order id required" });

    const feedback = await getFeedbackForOrder(orderId);

    // Normalize response
    if (feedback && typeof feedback === "object" && !Array.isArray(feedback)) {
      if (feedback.feedback) return res.json({ feedback: feedback.feedback });
      if (feedback.data) return res.json({ feedback: feedback.data });
      return res.json({ feedback });
    }

    return res.json({ feedback });
  } catch (err) {
    console.error("Error fetching order feedback:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch order feedback" });
  }
}

// ================================
// Create feedback
// ================================
async function addFeedback(req, res) {
  try {
    const { customer_id, order_no, rating, feedback_message } = req.body;

    if (!customer_id || !order_no || !rating || !feedback_message) {
      return res.status(400).json({
        error: "customer_id, order_no, rating, and feedback_message are required",
      });
    }

    const feedback = await createFeedback(customer_id, order_no, rating, feedback_message);

    if (!feedback) return res.status(400).json({ error: "Failed to create feedback" });

    return res.status(201).json({ message: "Feedback created", feedback });
  } catch (err) {
    console.error("Error creating feedback:", err.message || err);
    return res.status(500).json({ error: "Failed to create feedback" });
  }
}

// ================================
// Delete feedback
// ================================
async function removeFeedback(req, res) {
  try {
    const feedbackId = req.params.id;

    if (!feedbackId) return res.status(400).json({ error: "Feedback id required" });

    const result = await deleteFeedback(feedbackId);

    if (!result) return res.status(404).json({ error: "Feedback not found" });

    return res.json({ message: "Feedback deleted" });
  } catch (err) {
    console.error("Error deleting feedback:", err.message || err);
    return res.status(500).json({ error: "Failed to delete feedback" });
  }
}

module.exports = {
  fetchAllFeedback,
  fetchFeedbackByCustomer,
  fetchFeedbackForOrder,
  addFeedback,
  removeFeedback,
};
