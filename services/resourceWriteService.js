class ResourceWriteService {
    constructor({ createRepo, editRepo, deleteRepo }) {
        this.createRepo = createRepo;
        this.editRepo = editRepo;
        this.deleteRepo = deleteRepo;
    }

    async create(payload) {
        const data = await this.createRepo.execute(payload);
        return { status: 201, data };
    }

    async update(resourceId, payload) {
        const data = await this.editRepo.execute({ resource_id: resourceId, ...payload });
        return { status: 200, data };
    }

    async delete(resourceId) {
        const data = await this.deleteRepo.execute(resourceId);
        return { status: 200, data };
    }
}

module.exports = ResourceWriteService;
