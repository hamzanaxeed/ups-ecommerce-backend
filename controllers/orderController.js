const OrderService = require("../services/orderService");
const orderService = new OrderService();

// Fetch all orders
async function fetchAllOrders(req, res) {
    try {
        const orders = await orderService.fetchAll();
        return res.json({ orders });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch orders" });
    }
}

// Fetch order by ID
async function fetchOrderById(req, res) {
    try {
        const orderId = req.params.id;
        if (!orderId) return res.status(400).json({ error: "Order ID required" });

        const order = await orderService.fetchById(orderId);
        if (!order) return res.status(404).json({ error: "Order not found" });

        return res.json({ order });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch order" });
    }
}

// Fetch full order detail
async function fetchFullOrderDetail(req, res) {
    try {
        const orderId = req.params.id;
        if (!orderId) return res.status(400).json({ error: "Order ID required" });

        const detail = await orderService.fetchFullDetail(orderId);
        if (!detail) return res.status(404).json({ error: "Order not found" });

        return res.json({ orderDetail: detail });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch order detail" });
    }
}

// Create order
async function createOrder(req, res) {
    try {
        const { customer_id, items, delivery_Address } = req.body;
        if (!customer_id || !items || !items.length || !delivery_Address) {
            return res.status(400).json({ error: "customer_id, items, and delivery_Address required" });
        }

        const order = await orderService.createOrder({ customer_id, items, delivery_Address });
        return res.status(201).json({ message: "Order created", order });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create order" });
    }
}

// Other methods follow same pattern
async function fetchCustomerOrders(req, res) {
    try {
        const customerId = req.params.customerId;
        if (!customerId) return res.status(400).json({ error: "Customer ID required" });

        const orders = await orderService.fetchByCustomer(customerId);
        return res.json({ orders });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch customer orders" });
    }
}

async function updateStatus(req, res) {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        if (!orderId || !status) return res.status(400).json({ error: "Order ID and status required" });

        const order = await orderService.updateStatus(orderId, status);
        return res.json({ message: "Order status updated", order });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update order status" });
    }
}

async function removeOrder(req, res) {
    try {
        const orderId = req.params.id;
        if (!orderId) return res.status(400).json({ error: "Order ID required" });

        await orderService.deleteOrder(orderId);
        return res.json({ message: "Order deleted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete order" });
    }
}

async function fetchOrderSummary(req, res) {
    try {
        const report = await orderService.summaryReport();
        return res.json({ report });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch order summary" });
    }
}

async function completeOrder(req, res) {
    try {
        const orderId = req.params.id;
        const order = await orderService.completeOrder(orderId);
        return res.json({ message: "Order marked as completed", order });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to mark order as completed" });
    }
}

async function confirmOrder(req, res) {
    try {
        const orderId = req.params.id;
        const order = await orderService.confirmOrder(orderId);
        return res.json({ message: "Order marked as confirmed", order });
    } catch (err) {
        console.error(err);
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
    confirmOrder
};
