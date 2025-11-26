class PaymentWriteService {
    constructor(repos, validator) {
        this.addRepo = repos.addRepo;
        this.updateStatusRepo = repos.updateStatusRepo;
        this.deleteRepo = repos.deleteRepo;
        this.validator = validator;
    }

    async create(payload) {
        this.validator.validateCreate(payload);
        const data = await this.addRepo.execute(payload);
        return { status: 201, data: { message: "Payment created", payment: data } };
    }

    async updateStatus(paymentId, payload) {
        this.validator.validateUpdateStatus(payload);
        const data = await this.updateStatusRepo.execute(paymentId, payload.status);
        return { status: 200, data: { message: "Payment status updated", payment: data } };
    }

    async delete(paymentId) {
        const data = await this.deleteRepo.execute(paymentId);
        return { status: 200, data: { message: "Payment deleted", payment: data } };
    }
}

module.exports = PaymentWriteService;
