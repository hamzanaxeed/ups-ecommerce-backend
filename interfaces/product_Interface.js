class IProductRepository {
    async execute() {
        throw new Error("pure virtual function must be implemented");
    }
}

module.exports = IProductRepository;
