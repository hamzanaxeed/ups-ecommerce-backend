const OrderRepository = require("../repositories/order_Operations");

class OrderService {
    constructor(repos = {}) {
        // operation repos
        this.getAllRepo = repos.getAllRepo || new OrderRepository();
        this.getByIdRepo = repos.getByIdRepo || new OrderRepository();
        this.fullDetailRepo = repos.fullDetailRepo || new OrderRepository();
        this.createRepo = repos.createRepo || new OrderRepository();
        this.getByCustomerRepo = repos.getByCustomerRepo || new OrderRepository();
        this.updateStatusRepo = repos.updateStatusRepo || new OrderRepository();
        this.deleteRepo = repos.deleteRepo || new OrderRepository();
        this.summaryRepo = repos.summaryRepo || new OrderRepository();
        this.completeRepo = repos.completeRepo || new OrderRepository();
        this.confirmRepo = repos.confirmRepo || new OrderRepository();
    }

    async fetchAll() {
        const data = await this.getAllRepo.execute ? await this.getAllRepo.execute() : await this.getAllRepo.getAll();
        return { status: 200, data: { orders: data } };
    }

    async fetchById(id) {
        if (!id) return { status: 400, data: { error: "Order ID required" } };
        const data = await (this.getByIdRepo.execute ? await this.getByIdRepo.execute(id) : await this.getByIdRepo.getById(id));
        if (!data) return { status: 404, data: { error: "Order not found" } };
        return { status: 200, data: { order: data } };
    }

    async fetchFullDetail(id) {
        if (!id) return { status: 400, data: { error: "Order ID required" } };
        const data = await (this.fullDetailRepo.execute ? await this.fullDetailRepo.execute(id) : await this.fullDetailRepo.getFullDetail(id));
        if (!data) return { status: 404, data: { error: "Order not found" } };
        return { status: 200, data: { orderDetail: data } };
    }

    async createOrder(payload) {
        const data = await (this.createRepo.execute ? await this.createRepo.execute(payload) : await this.createRepo.create(payload));
        return { status: 201, data: { order: data } };
    }

    async fetchByCustomer(customerId) {
        if (!customerId) return { status: 400, data: { error: "Customer ID required" } };
        const data = await (this.getByCustomerRepo.execute ? await this.getByCustomerRepo.execute(customerId) : await this.getByCustomerRepo.getByCustomer(customerId));
        return { status: 200, data: { orders: data } };
    }

    async updateStatus(id, status) {
        if (!id || !status) return { status: 400, data: { error: "Order ID and status required" } };
        const data = await (this.updateStatusRepo.execute ? await this.updateStatusRepo.execute(id, status) : await this.updateStatusRepo.updateStatus(id, status));
        return { status: 200, data: { order: data } };
    }

    async deleteOrder(id) {
        if (!id) return { status: 400, data: { error: "Order ID required" } };
        const data = await (this.deleteRepo.execute ? await this.deleteRepo.execute(id) : await this.deleteRepo.delete(id));
        return { status: 200, data: { result: data } };
    }

    async summaryReport() {
        const data = await (this.summaryRepo.execute ? await this.summaryRepo.execute() : await this.summaryRepo.getSummaryReport());
        return { status: 200, data: { report: data } };
    }

    async completeOrder(id) {
        if (!id) return { status: 400, data: { error: "Order ID required" } };
        const data = await (this.completeRepo.execute ? await this.completeRepo.execute(id) : await this.completeRepo.complete(id));
        return { status: 200, data: { order: data } };
    }

    async confirmOrder(id) {
        if (!id) return { status: 400, data: { error: "Order ID required" } };
        const data = await (this.confirmRepo.execute ? await this.confirmRepo.execute(id) : await this.confirmRepo.confirm(id));
        return { status: 200, data: { order: data } };
    }
}

module.exports = OrderService;
