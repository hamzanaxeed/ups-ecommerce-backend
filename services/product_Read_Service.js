class ProductReadService {
    constructor(repos, validator) {
        this.getAllRepo = repos.getAllRepo;
        this.getByIdRepo = repos.getByIdRepo;
        this.validator = validator;
    }

    async getAll() {
        const data = await this.getAllRepo.execute();
        return { status: 200, data: { products: data } };
    }

    async getById(productId) {
        const data = await this.getByIdRepo.execute(productId);
        return { status: 200, data: { product: data } };
    }
}

module.exports = ProductReadService;
