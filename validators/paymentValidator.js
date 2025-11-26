class PaymentValidator {
    static validateCreate(payload) {
        const { order_id, payment_method, amount } = payload;
        if (!order_id || !payment_method || amount === undefined) {
            throw new Error("order_id, payment_method, and amount are required");
        }
    }

    static validateUpdateStatus(payload) {
        const { status } = payload;
        if (!status) throw new Error("Status is required");
    }
}

module.exports = PaymentValidator;
