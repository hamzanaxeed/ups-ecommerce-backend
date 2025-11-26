// Controllers now accept services via DI: orderService is provided in routes

// Fetch all orders
async function fetchAllOrders(req, res, orderService) {
    try {
        const response = await orderService.fetchAll();
        return res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch orders" });
    }
}

// Fetch order by ID
async function fetchOrderById(req, res, orderService) {
    try {
        const orderId = req.params.id;
        if (!orderId) return res.status(400).json({ error: "Order ID required" });

        const response = await orderService.fetchById(orderId);
        return res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch order" });
    }
}

// Fetch full order detail
async function fetchFullOrderDetail(req, res, orderService) {
    try {
        const orderId = req.params.id;
        if (!orderId) return res.status(400).json({ error: "Order ID required" });

        const response = await orderService.fetchFullDetail(orderId);
        return res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch order detail" });
    }
}

// Create order
async function createOrder(req, res, orderService) {
    try {
        const { customer_id, items, delivery_Address } = req.body;
        if (!customer_id || !items || !items.length || !delivery_Address) {
            return res.status(400).json({ error: "customer_id, items, and delivery_Address required" });
        }

        const response = await orderService.createOrder({ customer_id, items, delivery_Address });
        return res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create order" });
    }
}

// Other methods follow same pattern
async function fetchCustomerOrders(req, res, orderService) {
    try {
        const customerId = req.params.customerId;
        if (!customerId) return res.status(400).json({ error: "Customer ID required" });

        const response = await orderService.fetchByCustomer(customerId);
        return res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch customer orders" });
    }
}

async function updateStatus(req, res, orderService) {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        if (!orderId || !status) return res.status(400).json({ error: "Order ID and status required" });

        const response = await orderService.updateStatus(orderId, status);
        return res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update order status" });
    }
}

async function removeOrder(req, res, orderService) {
    try {
        const orderId = req.params.id;
        if (!orderId) return res.status(400).json({ error: "Order ID required" });

        const response = await orderService.deleteOrder(orderId);
        return res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete order" });
    }
}

async function fetchOrderSummary(req, res, orderService) {
    try {
        const response = await orderService.summaryReport();
        return res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch order summary" });
    }
}

async function completeOrder(req, res, orderService) {
    try {
        const orderId = req.params.id;
        const response = await orderService.completeOrder(orderId);
        return res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to mark order as completed" });
    }
}

async function confirmOrder(req, res, orderService) {
    try {
        const orderId = req.params.id;
        const response = await orderService.confirmOrder(orderId);
        return res.status(response.status).json(response.data);
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
