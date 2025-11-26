const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.fetchAllOrders);
router.get("/summary", orderController.fetchOrderSummary);
router.post("/", orderController.createOrder);
router.get("/customer/:customerId", orderController.fetchCustomerOrders);
router.get("/:id", orderController.fetchOrderById);
router.get("/:id/detail", orderController.fetchFullOrderDetail);
router.put("/:id/status", orderController.updateStatus);
router.put("/:id/complete", orderController.completeOrder);
router.put("/:id/confirm", orderController.confirmOrder);
router.delete("/:id", orderController.removeOrder);

module.exports = router;
