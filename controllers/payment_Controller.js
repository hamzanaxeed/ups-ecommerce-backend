const {
  getAllPayments,
  getPaymentsByOrder,
  createPayment,
  updatePaymentStatus,
  deletePayment,
} = require("../models/payment_Model");

// ================================
// Fetch all payments (Admin)
// ================================
async function fetchAllPayments(req, res) {
  try {
    const payments = await getAllPayments();

    // Normalize response
    if (payments && typeof payments === "object" && !Array.isArray(payments)) {
      if (payments.payments) return res.json({ payments: payments.payments });
      if (payments.data) return res.json({ payments: payments.data });
      return res.json({ payments });
    }

    return res.json({ payments });
  } catch (err) {
    console.error("Error fetching all payments:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch payments" });
  }
}

// ================================
// Fetch payments by order
// ================================
async function fetchPaymentsByOrder(req, res) {
  try {
    const orderId = req.params.orderId;

    if (!orderId) return res.status(400).json({ error: "Order id required" });

    const payments = await getPaymentsByOrder(orderId);

    // Normalize response
    if (payments && typeof payments === "object" && !Array.isArray(payments)) {
      if (payments.payments) return res.json({ payments: payments.payments });
      if (payments.data) return res.json({ payments: payments.data });
      return res.json({ payments });
    }

    return res.json({ payments });
  } catch (err) {
    console.error("Error fetching payments by order:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch payments" });
  }
}

// ================================
// Create payment
// ================================
async function addPayment(req, res) {
  try {
    const { order_id, payment_method, amount } = req.body;

    if (!order_id || !payment_method || amount === undefined) {
      return res.status(400).json({
        error: "order_id, payment_method, and amount are required",
      });
    }

    const payment = await createPayment(order_id, payment_method, amount);

    if (!payment) return res.status(400).json({ error: "Failed to create payment" });

    return res.status(201).json({ message: "Payment created", payment });
  } catch (err) {
    console.error("Error creating payment:", err.message || err);
    return res.status(500).json({ error: "Failed to create payment" });
  }
}

// ================================
// Update payment status
// ================================
async function updateStatus(req, res) {
  try {
    const paymentId = req.params.id;
    const { status } = req.body;

    if (!paymentId) return res.status(400).json({ error: "Payment id required" });
    if (!status) return res.status(400).json({ error: "Status is required" });

    const payment = await updatePaymentStatus(paymentId, status);

    if (!payment) return res.status(404).json({ error: "Payment not found" });

    return res.json({ message: "Payment status updated", payment });
  } catch (err) {
    console.error("Error updating payment status:", err.message || err);
    return res.status(500).json({ error: "Failed to update payment status" });
  }
}

// ================================
// Delete payment
// ================================
async function removePayment(req, res) {
  try {
    const paymentId = req.params.id;

    if (!paymentId) return res.status(400).json({ error: "Payment id required" });

    const result = await deletePayment(paymentId);

    if (!result) return res.status(404).json({ error: "Payment not found" });

    return res.json({ message: "Payment deleted" });
  } catch (err) {
    console.error("Error deleting payment:", err.message || err);
    return res.status(500).json({ error: "Failed to delete payment" });
  }
}

module.exports = {
  fetchAllPayments,
  fetchPaymentsByOrder,
  addPayment,
  updateStatus,
  removePayment,
};
