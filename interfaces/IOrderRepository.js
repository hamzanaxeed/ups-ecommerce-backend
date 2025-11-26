// src/interfaces/IOrderRepository.js
class IOrderRepository {
    async getAll() { throw new Error("Method 'getAll' must be implemented"); }
    async getById(id) { throw new Error("Method 'getById' must be implemented"); }
    async getFullDetail(id) { throw new Error("Method 'getFullDetail' must be implemented"); }
    async create(payload) { throw new Error("Method 'create' must be implemented"); }
    async getByCustomer(customerId) { throw new Error("Method 'getByCustomer' must be implemented"); }
    async updateStatus(id, status) { throw new Error("Method 'updateStatus' must be implemented"); }
    async delete(id) { throw new Error("Method 'delete' must be implemented"); }
    async getSummaryReport() { throw new Error("Method 'getSummaryReport' must be implemented"); }
    async complete(id) { throw new Error("Method 'complete' must be implemented"); }
    async confirm(id) { throw new Error("Method 'confirm' must be implemented"); }
}

module.exports = IOrderRepository;
