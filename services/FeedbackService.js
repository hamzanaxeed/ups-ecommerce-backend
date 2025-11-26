const FeedbackRepository = require("../repositories/FeedbackRepository");
const { validateCreateFeedback } = require("../validators/FeedbackValidator");

class FeedbackService {
    constructor() { this.repo = new FeedbackRepository(); }

    async getAll() {
        const feedback = await this.repo.getAll();
        return { status: 200, data: { feedback } };
    }

    async getByCustomer(customerId) {
        if (!customerId) return { status: 400, data: { error: "Customer ID required" } };
        const feedback = await this.repo.getByCustomer(customerId);
        return { status: 200, data: { feedback } };
    }

    async getByOrder(orderId) {
        if (!orderId) return { status: 400, data: { error: "Order ID required" } };
        const feedback = await this.repo.getByOrder(orderId);
        return { status: 200, data: { feedback } };
    }

    async create(feedbackData) {
        const errors = validateCreateFeedback(feedbackData);
        console.log("Validation Errors:", errors);
        if (errors.length) return { status: 400, data: { error: errors.join(", ") } };
        const feedback = await this.repo.create(feedbackData);
        console.log("Created Feedback:", feedback);
        return { status: 201, data: { message: "Feedback created", feedback } };
    }

    async delete(feedbackId) {
        if (!feedbackId) return { status: 400, data: { error: "Feedback ID required" } };
        const result = await this.repo.delete(feedbackId);
        return { status: 200, data: { message: "Feedback deleted", result } };
    }
}

module.exports = FeedbackService;
