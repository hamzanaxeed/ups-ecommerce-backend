const supabase = require("../db/supabaseClient");
const IFeedbackRepository = require("../interfaces/IFeedbackRepository");

class FeedbackRepository extends IFeedbackRepository {
    async getAll() {
        const { data, error } = await supabase.rpc("get_all_feedback");
        if (error) throw error;
        return data;
    }

    async getByCustomer(customerId) {
        const { data, error } = await supabase.rpc("get_feedback_by_customer", {
            p_customer: customerId,
        });
        if (error) throw error;
        return data;
    }

    async getByOrder(orderId) {
        const { data, error } = await supabase.rpc("get_feedback_by_order", {
            p_order_id: orderId,
        });
        if (error) throw error;
        return data;
    }

    async create({ customerId, orderNo, rating, message }) {
        const { data, error } = await supabase.rpc("create_feedback", {
            p_customer: customerId,
            p_order_no: orderNo,
            p_rating: rating,
            p_message: message,
        });
        console.log(data, error);
        if (error) throw error;
        return data;
    }

    async delete(feedbackId) {
        const { data, error } = await supabase.rpc("delete_feedback", {
            p_feedback_id: feedbackId,
        });
        if (error) throw error;
        return data;
    }
}

module.exports = FeedbackRepository;
