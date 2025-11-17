const supabase = require("../db/supabaseClient");

// Get all feedback
async function getAllFeedback() {
  const { data, error } = await supabase.rpc("get_all_feedback");
  if (error) throw error;
  return data;
}

// Get feedback by customer
async function getFeedbackByCustomer(customerId) {
  const { data, error } = await supabase.rpc("get_feedback_by_customer", {
    p_customer: customerId,
  });
  if (error) throw error;
  return data;
}

// Get feedback for an order
async function getFeedbackForOrder(orderId) {
  const { data, error } = await supabase.rpc("get_feedback_by_order", {
    p_order_id: orderId,
  });
  if (error) throw error;
  return data;
}

// Create feedback
async function createFeedback(customerId, orderNo, rating, message) {
  const { data, error } = await supabase.rpc("create_feedback", {
    p_customer: customerId,
    p_order_no: orderNo,
    p_rating: rating,
    p_message: message,
  });
  if (error) throw error;
  return data;
}

// Delete feedback
async function deleteFeedback(feedbackId) {
  const { data, error } = await supabase.rpc("delete_feedback", {
    p_feedback_id: feedbackId,
  });
  if (error) throw error;
  return data;
}

module.exports = {
  getAllFeedback,
  getFeedbackByCustomer,
  getFeedbackForOrder,
  createFeedback,
  deleteFeedback,
};
