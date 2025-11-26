const db = require("../core/dbClient");
const IFeedbackRepository = require("../interfaces/feedback_Interface");

class GetAllFeedbackRepository extends IFeedbackRepository {
    async execute() {
        return db.callProcedure("get_all_feedback");
    }
}

class GetFeedbackByCustomerRepository extends IFeedbackRepository {
    async execute(customerId) {
        return db.callProcedure("get_feedback_by_customer", { p_customer: customerId });
    }
}

class GetFeedbackByOrderRepository extends IFeedbackRepository {
    async execute(orderId) {
        return db.callProcedure("get_feedback_by_order", { p_order_id: orderId });
    }
}

class CreateFeedbackRepository extends IFeedbackRepository {
    async execute({ customerId, orderNo, rating, message }) {
        return db.callProcedure("create_feedback", {
            p_customer: customerId,
            p_order_no: orderNo,
            p_rating: rating,
            p_message: message,
        });
    }
}

class DeleteFeedbackRepository extends IFeedbackRepository {
    async execute(feedbackId) {
        return db.callProcedure("delete_feedback", { p_feedback_id: feedbackId });
    }
}

module.exports = {
    GetAllFeedbackRepository,
    GetFeedbackByCustomerRepository,
    GetFeedbackByOrderRepository,
    CreateFeedbackRepository,
    DeleteFeedbackRepository,
};
