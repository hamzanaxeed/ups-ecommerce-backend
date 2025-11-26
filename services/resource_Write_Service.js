class ResourceWriteService {
    constructor({ createRepo, editRepo, deleteRepo }) {
        this.createRepo = createRepo;
        this.editRepo = editRepo;
        this.deleteRepo = deleteRepo;
    }

    async create(payload) {
        const resp = await this.createRepo.execute(payload);
        const data = resp && resp.data !== undefined ? resp.data : (resp && resp.response ? resp.response : resp);
        return { status: 201, data };
    }

    async update(resourceId, payload) {
        const resp = await this.editRepo.execute({ resource_id: resourceId, ...payload });
        const data = resp && resp.data !== undefined ? resp.data : (resp && resp.response ? resp.response : resp);
        return { status: 200, data };
    }

    async delete(resourceId) {
        const resp = await this.deleteRepo.execute(resourceId);
        const data = resp && resp.data !== undefined ? resp.data : (resp && resp.response ? resp.response : resp);
        return { status: 200,data };
    }
}

module.exports = ResourceWriteService;
