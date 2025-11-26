const supabase = require("../db/supabaseClient");
const IOrderRepository = require("../interfaces/IOrderRepository");

class OrderRepository extends IOrderRepository {
    async getAll() {
        const { data, error } = await supabase.rpc("get_all_orders");
        if (error) throw error;
        return data;
    }

    async getById(orderId) {
        const { data, error } = await supabase.rpc("get_order_by_id", { p_order_id: orderId });
        if (error) throw error;
        return data;
    }

    async getFullDetail(orderId) {
        const { data, error } = await supabase.rpc("get_order_full_detail", { p_order_id: orderId });
        if (error) throw error;
        return data;
    }

    async create(payload) {
        const { data, error } = await supabase.rpc("create_full_order", {
            p_customer_id: payload.customer_id,
            p_items: payload.items,
            p_delivery_address: payload.delivery_Address
        });
        if (error) throw error;
        return data;
    }

    async getByCustomer(customerId) {
        const { data, error } = await supabase.rpc("get_customer_orders", { p_customer_id: customerId });
        if (error) throw error;
        return data;
    }

    async updateStatus(orderId, status) {
        const { data, error } = await supabase.rpc("update_order_status", {
            p_order_id: orderId,
            p_status: status
        });
        if (error) throw error;
        return data;
    }

    async delete(orderId) {
        const { data, error } = await supabase.rpc("delete_order", { p_order_id: orderId });
        if (error) throw error;
        return data;
    }

    async getSummaryReport() {
        const { data, error } = await supabase.rpc("get_order_summary_report");
        if (error) throw error;
        return data;
    }

    async complete(orderId) {
        const { data, error } = await supabase.rpc("mark_order_completed", { p_order_id: orderId });
        if (error) throw error;
        return data;
    }

    async confirm(orderId) {
        const { data, error } = await supabase.rpc("mark_order_confirmed", { p_order_id: orderId });
        if (error) throw error;
        return data;
    }
}

module.exports = OrderRepository;
