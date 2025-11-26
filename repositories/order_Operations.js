const db = require("../core/dbClient");
const IOrderRepository = require("../interfaces/order_Interface");

class GetAllOrdersRepository extends IOrderRepository {
    async execute() {
        return db.callProcedure("get_all_orders");
    }
}

class GetOrderByIdRepository extends IOrderRepository {
    async execute(orderId) {
        return db.callProcedure("get_order_by_id", { p_order_id: orderId });
    }
}

class GetOrderFullDetailRepository extends IOrderRepository {
    async execute(orderId) {
        return db.callProcedure("get_order_full_detail", { p_order_id: orderId });
    }
}

class CreateFullOrderRepository extends IOrderRepository {
    async execute(payload) {
        return db.callProcedure("create_full_order", {
            p_customer_id: payload.customer_id,
            p_items: payload.items,
            p_delivery_address: payload.delivery_Address,
        });
    }
}

class GetOrdersByCustomerRepository extends IOrderRepository {
    async execute(customerId) {
        return db.callProcedure("get_customer_orders", { p_customer_id: customerId });
    }
}

class UpdateOrderStatusRepository extends IOrderRepository {
    async execute(orderId, status) {
        return db.callProcedure("update_order_status", { p_order_id: orderId, p_status: status });
    }
}

class DeleteOrderRepository extends IOrderRepository {
    async execute(orderId) {
        return db.callProcedure("delete_order", { p_order_id: orderId });
    }
}

class GetOrderSummaryRepository extends IOrderRepository {
    async execute() {
        return db.callProcedure("get_order_summary_report");
    }
}

class CompleteOrderRepository extends IOrderRepository {
    async execute(orderId) {
        return db.callProcedure("mark_order_completed", { p_order_id: orderId });
    }
}

class ConfirmOrderRepository extends IOrderRepository {
    async execute(orderId) {
        return db.callProcedure("mark_order_confirmed", { p_order_id: orderId });
    }
}

module.exports = {
    GetAllOrdersRepository,
    GetOrderByIdRepository,
    GetOrderFullDetailRepository,
    CreateFullOrderRepository,
    GetOrdersByCustomerRepository,
    UpdateOrderStatusRepository,
    DeleteOrderRepository,
    GetOrderSummaryRepository,
    CompleteOrderRepository,
    ConfirmOrderRepository,
};
