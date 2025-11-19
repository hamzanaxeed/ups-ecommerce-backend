const supabase = require("../db/supabaseClient");

// Get all payments (admin)
async function getAllPayments() {
  const { data, error } = await supabase.rpc("get_all_payments");
  if (error) throw error;
  return data;
}

// Get payments of a specific order
async function getPaymentsByOrder(orderId) {
  const { data, error } = await supabase.rpc("get_payments_by_order", {
    p_order_id: orderId,
  });
  if (error) throw error;
  return data;
}

// Create payment
async function createPayment(orderId, method, amount) {
  const { data, error } = await supabase.rpc("create_payment", {
    p_order_id: orderId,
    p_method: method,
    p_amount: amount,
  });
  if (error) throw error;
  return data;
}

// Update payment status
async function updatePaymentStatus(paymentId, status) {
  const { data, error } = await supabase.rpc("update_payment_status", {
    p_payment_id: paymentId,
    p_status: status,
  });
  if (error) throw error;
  return data;
}

// Delete payment
async function deletePayment(paymentId) {
  const { data, error } = await supabase.rpc("delete_payment", {
    p_payment_id: paymentId,
  });
  if (error) throw error;
  return data;
}

module.exports = {
  getAllPayments,
  getPaymentsByOrder,
  createPayment,
  updatePaymentStatus,
  deletePayment,
};
