// src/services/serviceWriteService.js
class ServiceWriteService {
    constructor({ createRepo, updateRepo, deleteRepo }) {
        this.createRepo = createRepo;
        this.updateRepo = updateRepo;
        this.deleteRepo = deleteRepo;
    }

    async create(payload) {
        const { data, error } = await this.createRepo.execute(payload);
        if (error) throw error;
        return { status: 201, data };
    }

    async update(service_id, payload) {
        const { data, error } = await this.updateRepo.execute({
            service_id,
            ...payload
        });
        if (error) throw error;
        return { status: 200, data };
    }

    async delete(service_id) {
        const { data, error } = await this.deleteRepo.execute(service_id);
        if (error) throw error;
        return { status: 200, data };
    }
}

module.exports = ServiceWriteService;
