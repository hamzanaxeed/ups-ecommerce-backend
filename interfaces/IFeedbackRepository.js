class IFeedbackRepository {
    async getAll() { throw new Error("Method must be implemented"); }
    async getByCustomer(customerId) { throw new Error("Method must be implemented"); }
    async getByOrder(orderId) { throw new Error("Method must be implemented"); }
    async create(feedback) { throw new Error("Method must be implemented"); }
    async delete(feedbackId) { throw new Error("Method must be implemented"); }
}

module.exports = IFeedbackRepository;
