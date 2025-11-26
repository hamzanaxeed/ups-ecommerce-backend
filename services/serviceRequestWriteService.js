class ServiceRequestWriteService {
    constructor({ createRepo, editRepo, deleteRepo, assignRepo, declineRepo, completeRepo }) {
        this.createRepo = createRepo;
        this.editRepo = editRepo;
        this.deleteRepo = deleteRepo;
        this.assignRepo = assignRepo;
        this.declineRepo = declineRepo;
        this.completeRepo = completeRepo;
    }

    async create(payload) {
        const data = await this.createRepo.execute(payload);
        return { status: 201, data };
    }

    async update(request_id, payload) {
        const data = await this.editRepo.execute({ request_id, ...payload });
        return { status: 200, data };
    }

    async delete(request_id) {
        const data = await this.deleteRepo.execute(request_id);
        return { status: 200, data };
    }

    async assignTechnician(request_id, technician_id) {
        const data = await this.assignRepo.execute(request_id, technician_id);
        return { status: 200, data };
    }

    async decline(request_id) {
        const data = await this.declineRepo.execute(request_id);
        return { status: 200, data };
    }

    async complete(request_id) {
        const data = await this.completeRepo.execute(request_id);
        return { status: 200, data };
    }
}

module.exports = ServiceRequestWriteService;
