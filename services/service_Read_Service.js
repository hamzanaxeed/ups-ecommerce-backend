// src/services/serviceReadService.js
class ServiceReadService {
    constructor({ allRepo, idRepo, availableRepo }) {
        this.allRepo = allRepo;
        this.idRepo = idRepo;
        this.availableRepo = availableRepo;
    }

    async getAll() {
        const { data, error } = await this.allRepo.execute();
        if (error) throw error;
        return { status: 200, data };
    }

    async getById(id) {
        const { data, error } = await this.idRepo.execute(id);
        if (error) throw error;
        return { status: 200, data };
    }

    async getAvailable() {
        const { data, error } = await this.availableRepo.execute();
        if (error) throw error;
        return { status: 200, data };
    }
}

module.exports = ServiceReadService;
