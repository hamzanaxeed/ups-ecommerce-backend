// models/order_Model.js
const supabase = require("../db/supabaseClient");

// Fetch all orders
async function getAllOrders() {
  const { data, error } = await supabase.rpc("get_all_orders");
  if (error) throw error;
  return data;
}

// Get order by id (with items)
async function getOrderById(orderId) {
  const { data, error } = await supabase.rpc("get_order_by_id", {
    p_order_id: orderId,
  });
  if (error) throw error;
  return data;
}

// Get full order detail (products, categories)
async function getFullOrderDetail(orderId) {
  const { data, error } = await supabase.rpc("get_order_full_detail", {
    p_order_id: orderId,
  });
  if (error) throw error;
  return data;
}

// Create full order (order + items)
async function createFullOrder(payload) {
  const { data, error } = await supabase.rpc("create_full_order", {
    p_customer_id: payload.customer_id,
    p_items: payload.items,
  });

  if (error) throw error;
  return data;
}

// Get orders of a specific customer
async function getCustomerOrders(customerId) {
  const { data, error } = await supabase.rpc("get_customer_orders", {
    p_customer_id: customerId,
  });

  if (error) throw error;
  return data;
}

// Update status
async function updateOrderStatus(orderId, status) {
  const { data, error } = await supabase.rpc("update_order_status", {
    p_order_id: orderId,
    p_status: status,
  });

  if (error) throw error;
  return data;
}

// Delete order
async function deleteOrder(orderId) {
  const { data, error } = await supabase.rpc("delete_order", {
    p_order_id: orderId,
  });

  if (error) throw error;
  return data;
}

// Order summary report
async function getOrderSummaryReport() {
  const { data, error } = await supabase.rpc("get_order_summary_report");
  if (error) throw error;
  return data;
}

module.exports = {
  getAllOrders,
  getOrderById,
  getFullOrderDetail,
  createFullOrder,
  getCustomerOrders,
  updateOrderStatus,
  deleteOrder,
  getOrderSummaryReport,
};
