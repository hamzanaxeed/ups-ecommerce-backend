class ResourceReadService {
    constructor({ customerRepo, technicianRepo, allRepo }) {
        this.customerRepo = customerRepo;
        this.technicianRepo = technicianRepo;
        this.allRepo = allRepo;
    }

    async getForCustomers() {
        const resp = await this.customerRepo.execute();
        const data = resp && resp.data !== undefined ? resp.data : (resp && resp.response ? resp.response : resp);
        return { status: 200, data };
    }

    async getForTechnicians() {
        const resp = await this.technicianRepo.execute();
        const data = resp && resp.data !== undefined ? resp.data : (resp && resp.response ? resp.response : resp);
        return { status: 200, data };
    }

    async getAll() {
        const resp = await this.allRepo.execute();
        const data = resp && resp.data !== undefined ? resp.data : (resp && resp.response ? resp.response : resp);
        return { status: 200, data };
    }
}

module.exports = ResourceReadService;
