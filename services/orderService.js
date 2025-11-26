const OrderRepository = require("../repositories/OrderRepository");

class OrderService {
    constructor() {
        this.repository = new OrderRepository();
    }

    async fetchAll() { return this.repository.getAll(); }
    async fetchById(id) { return this.repository.getById(id); }
    async fetchFullDetail(id) { return this.repository.getFullDetail(id); }
    async createOrder(payload) { return this.repository.create(payload); }
    async fetchByCustomer(customerId) { return this.repository.getByCustomer(customerId); }
    async updateStatus(id, status) { return this.repository.updateStatus(id, status); }
    async deleteOrder(id) { return this.repository.delete(id); }
    async summaryReport() { return this.repository.getSummaryReport(); }
    async completeOrder(id) { return this.repository.complete(id); }
    async confirmOrder(id) { return this.repository.confirm(id); }
}

module.exports = OrderService;
