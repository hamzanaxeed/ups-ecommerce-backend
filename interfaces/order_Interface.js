// src/interfaces/IOrderRepository.js
class IOrderRepository {
    async execute() {
        throw new Error("pure virtual function must be implemented");
    }}

module.exports = IOrderRepository;
