class ProductWriteService {
    constructor(repos, validator) {
        this.addRepo = repos.addRepo;
        this.updateRepo = repos.updateRepo;
        this.deleteRepo = repos.deleteRepo;
        this.validator = validator;
    }

    async create(payload) {
        this.validator.validateCreate(payload);
        const data = await this.addRepo.execute(payload);
        return { status: 201, data: { message: "Product created", product: data } };
    }

    async update(productId, payload) {
        this.validator.validateUpdate(payload);
        const data = await this.updateRepo.execute({ product_id: productId, ...payload });
        return { status: 200, data: { message: "Product updated", product: data } };
    }

    async delete(productId) {
        const data = await this.deleteRepo.execute(productId);
        return { status: 200, data: { message: "Product deleted", product: data } };
    }
}

module.exports = ProductWriteService;
