const express = require("express");
const router = express.Router();
const {
  fetchAllOrders,
  fetchOrderById,
  fetchFullOrderDetail,
  createOrder,
  fetchCustomerOrders,
  updateStatus,
  removeOrder,
  fetchOrderSummary,
  completeOrder,
  confirmOrder,
} = require("../controllers/order_Controller");

// GET /api/orders -> returns all orders (Admin)
router.get("/", fetchAllOrders);

// GET /api/orders/summary -> returns order summary report
router.get("/summary", fetchOrderSummary);

// POST /api/orders -> creates a new order
router.post("/", createOrder);

// GET /api/orders/customer/:customerId -> returns orders for a specific customer
router.get("/customer/:customerId", fetchCustomerOrders);

// GET /api/orders/:id -> returns order by id
router.get("/:id", fetchOrderById);

// GET /api/orders/:id/detail -> returns full order detail (products, categories)
router.get("/:id/detail", fetchFullOrderDetail);

// PUT /api/orders/:id/status -> updates order status
router.put("/:id/status", updateStatus);

// PUT /api/orders/:id/complete -> marks order as completed
router.put("/:id/complete", completeOrder);

// PUT /api/orders/:id/confirm -> marks order as confirmed
router.put("/:id/confirm", confirmOrder);

// DELETE /api/orders/:id -> deletes order
router.delete("/:id", removeOrder);

module.exports = router;
