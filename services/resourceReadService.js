class ResourceReadService {
    constructor({ customerRepo, technicianRepo, allRepo }) {
        this.customerRepo = customerRepo;
        this.technicianRepo = technicianRepo;
        this.allRepo = allRepo;
    }

    async getForCustomers() {
        const data = await this.customerRepo.execute();
        return { status: 200, data };
    }

    async getForTechnicians() {
        const data = await this.technicianRepo.execute();
        return { status: 200, data };
    }

    async getAll() {
        const data = await this.allRepo.execute();
        return { status: 200, data };
    }
}

module.exports = ResourceReadService;
