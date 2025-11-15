const express = require("express");
const router = express.Router();
const {
  fetchAllPayments,
  fetchPaymentsByOrder,
  addPayment,
  updateStatus,
  removePayment,
} = require("../controllers/payment_Controller");

// GET /api/payments -> returns all payments (Admin)
router.get("/", fetchAllPayments);

// POST /api/payments -> creates a new payment
router.post("/", addPayment);

// GET /api/payments/order/:orderId -> returns payments for a specific order
router.get("/order/:orderId", fetchPaymentsByOrder);

// PUT /api/payments/:id/status -> updates payment status
router.put("/:id/status", updateStatus);

// DELETE /api/payments/:id -> deletes payment
router.delete("/:id", removePayment);

module.exports = router;
