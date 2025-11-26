class IPaymentRepository {
    async execute() {
        throw new Error("pure virtual function must be implemented");
    }
}

module.exports = IPaymentRepository;
