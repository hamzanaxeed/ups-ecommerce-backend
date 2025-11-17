const {
  getAllOrders,
  getOrderById,
  getFullOrderDetail,
  createFullOrder,
  getCustomerOrders,
  updateOrderStatus,
  deleteOrder,
  getOrderSummaryReport,
  markOrderCompleted,
  markOrderConfirmed,
} = require("../models/order_Model");

// ================================
// Fetch all orders (Admin)
// ================================
async function fetchAllOrders(req, res) {
  try {
    const orders = await getAllOrders();

    // Normalize response
    if (orders && typeof orders === "object" && !Array.isArray(orders)) {
      if (orders.orders) return res.json({ orders: orders.orders });
      if (orders.data) return res.json({ orders: orders.data });
      return res.json({ orders });
    }

    return res.json({ orders });
  } catch (err) {
    console.error("Error fetching all orders:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch orders" });
  }
}

// ================================
// Fetch order by ID
// ================================
async function fetchOrderById(req, res) {
  try {
    const orderId = req.params.id;

    if (!orderId) return res.status(400).json({ error: "Order id required" });

    const order = await getOrderById(orderId);

    if (!order) return res.status(404).json({ error: "Order not found" });

    return res.json({ order });
  } catch (err) {
    console.error("Error fetching order by id:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch order" });
  }
}

// ================================
// Fetch full order detail
// ================================
async function fetchFullOrderDetail(req, res) {
  try {
    const orderId = req.params.id;

    if (!orderId) return res.status(400).json({ error: "Order id required" });

    const orderDetail = await getFullOrderDetail(orderId);

    if (!orderDetail) return res.status(404).json({ error: "Order not found" });

    return res.json({ orderDetail });
  } catch (err) {
    console.error("Error fetching full order detail:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch order detail" });
  }
}

// ================================
// Create full order
// ================================
async function createOrder(req, res) {
  try {
    const { customer_id, items } = req.body;

    // Validation
    if (!customer_id || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "customer_id and items (non-empty array) are required",
      });
    }

    const payload = {
      customer_id,
      items,
    };

    const order = await createFullOrder(payload);

    if (!order) return res.status(400).json({ error: "Failed to create order" });

    return res.status(201).json({ message: "Order created", order });
  } catch (err) {
    console.error("Error creating order:", err.message || err);
    return res.status(500).json({ error: "Failed to create order" });
  }
}

// ================================
// Fetch customer orders
// ================================
async function fetchCustomerOrders(req, res) {
  try {
    const customerId = req.params.customerId;

    if (!customerId) return res.status(400).json({ error: "Customer id required" });

    const orders = await getCustomerOrders(customerId);

    // Normalize response
    if (orders && typeof orders === "object" && !Array.isArray(orders)) {
      if (orders.orders) return res.json({ orders: orders.orders });
      if (orders.data) return res.json({ orders: orders.data });
      return res.json({ orders });
    }

    return res.json({ orders });
  } catch (err) {
    console.error("Error fetching customer orders:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch customer orders" });
  }
}

// ================================
// Update order status
// ================================
async function updateStatus(req, res) {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!orderId) return res.status(400).json({ error: "Order id required" });
    if (!status) return res.status(400).json({ error: "Status is required" });

    const order = await updateOrderStatus(orderId, status);

    if (!order) return res.status(404).json({ error: "Order not found" });

    return res.json({ message: "Order status updated", order });
  } catch (err) {
    console.error("Error updating order status:", err.message || err);
    return res.status(500).json({ error: "Failed to update order status" });
  }
}

// ================================
// Delete order
// ================================
async function removeOrder(req, res) {
  try {
    const orderId = req.params.id;

    if (!orderId) return res.status(400).json({ error: "Order id required" });

    const result = await deleteOrder(orderId);

    if (!result) return res.status(404).json({ error: "Order not found" });

    return res.json({ message: "Order deleted" });
  } catch (err) {
    console.error("Error deleting order:", err.message || err);
    return res.status(500).json({ error: "Failed to delete order" });
  }
}

// ================================
// Fetch order summary report
// ================================
async function fetchOrderSummary(req, res) {
  try {
    const report = await getOrderSummaryReport();

    return res.json({ report });
  } catch (err) {
    console.error("Error fetching order summary:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch order summary" });
  }
}

// ================================
// Mark order as completed
// ================================
async function completeOrder(req, res) {
  try {
    const orderId = req.params.id;

    if (!orderId) return res.status(400).json({ error: "Order id required" });

    const result = await markOrderCompleted(orderId);

    if (!result) return res.status(404).json({ error: "Order not found" });

    return res.json({ message: "Order marked as completed", order: result });
  } catch (err) {
    console.error("Error marking order as completed:", err.message || err);
    return res.status(500).json({ error: "Failed to mark order as completed" });
  }
}

// ================================
// Mark order as confirmed
// ================================
async function confirmOrder(req, res) {
  try {
    const orderId = req.params.id;

    if (!orderId) return res.status(400).json({ error: "Order id required" });

    const result = await markOrderConfirmed(orderId);

    if (!result) return res.status(404).json({ error: "Order not found" });

    return res.json({ message: "Order marked as confirmed", order: result });
  } catch (err) {
    console.error("Error marking order as confirmed:", err.message || err);
    return res.status(500).json({ error: "Failed to mark order as confirmed" });
  }
}

module.exports = {
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
};
