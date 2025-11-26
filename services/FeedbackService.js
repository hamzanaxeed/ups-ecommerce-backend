const FeedbackRepository = require("../repositories/FeedbackRepository");
const { validateCreateFeedback } = require("../validators/FeedbackValidator");

class FeedbackService {
    constructor(repos = { allRepo: new FeedbackRepository(), byCustomerRepo: null, byOrderRepo: null, createRepo: null, deleteRepo: null }) {
        this.allRepo = repos.allRepo;
        this.byCustomerRepo = repos.byCustomerRepo;
        this.byOrderRepo = repos.byOrderRepo;
        this.createRepo = repos.createRepo;
        this.deleteRepo = repos.deleteRepo;
    }

    async getAll() {
        const feedback = await this.allRepo.execute();
        return { status: 200, data: { feedback } };
    }

    async getByCustomer(customerId) {
        if (!customerId) return { status: 400, data: { error: "Customer ID required" } };
        const feedback = await this.byCustomerRepo.execute(customerId);
        return { status: 200, data: { feedback } };
    }

    async getByOrder(orderId) {
        if (!orderId) return { status: 400, data: { error: "Order ID required" } };
        const feedback = await this.byOrderRepo.execute(orderId);
        return { status: 200, data: { feedback } };
    }

    async create(feedbackData) {
        const errors = validateCreateFeedback(feedbackData);
        console.log("Validation Errors:", errors);
        if (errors.length) return { status: 400, data: { error: errors.join(", ") } };
        const feedback = await this.createRepo.execute(feedbackData);
        console.log("Created Feedback:", feedback);
        return { status: 201, data: { message: "Feedback created", feedback } };
    }

    async delete(feedbackId) {
        if (!feedbackId) return { status: 400, data: { error: "Feedback ID required" } };
        const result = await this.deleteRepo.execute(feedbackId);
        return { status: 200, data: { message: "Feedback deleted", result } };
    }
}

module.exports = FeedbackService;
