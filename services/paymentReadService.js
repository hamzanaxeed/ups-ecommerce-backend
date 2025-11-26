class PaymentReadService {
    constructor(repos, validator) {
        this.getAllRepo = repos.getAllRepo;
        this.getByOrderRepo = repos.getByOrderRepo;
        this.validator = validator;
    }

    async getAll() {
        const data = await this.getAllRepo.execute();
        return { status: 200, data: { payments: data } };
    }

    async getByOrder(orderId) {
        const data = await this.getByOrderRepo.execute(orderId);
        return { status: 200, data: { payments: data } };
    }
}

module.exports = PaymentReadService;
