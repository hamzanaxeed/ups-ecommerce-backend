const db = require("../core/dbClient");
const IPaymentRepository = require("../interfaces/payment_Interface");

class GetAllPaymentsRepository extends IPaymentRepository {
    async execute() {
        return db.callProcedure("get_all_payments");
    }
}

class GetPaymentsByOrderRepository extends IPaymentRepository {
    async execute(orderId) {
        return db.callProcedure("get_payments_by_order", { p_order_id: orderId });
    }
}

class AddPaymentRepository extends IPaymentRepository {
    async execute({ order_id, payment_method, amount }) {
        return db.callProcedure("create_payment", {
            p_order_id: order_id,
            p_method: payment_method,
            p_amount: amount,
        });
    }
}

class UpdatePaymentStatusRepository extends IPaymentRepository {
    async execute(paymentId, status) {
        return db.callProcedure("update_payment_status", {
            p_payment_id: Number(paymentId),
            p_status: status,
        });
    }
}

class DeletePaymentRepository extends IPaymentRepository {
    async execute(paymentId) {
        return db.callProcedure("delete_payment", { p_payment_id: Number(paymentId) });
    }
}

module.exports = {
    GetAllPaymentsRepository,
    GetPaymentsByOrderRepository,
    AddPaymentRepository,
    UpdatePaymentStatusRepository,
    DeletePaymentRepository,
};
