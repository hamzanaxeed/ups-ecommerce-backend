// src/services/slotWriteService.js
class SlotWriteService {
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

    async update(slot_id, payload) {
        const { data, error } = await this.updateRepo.execute({
            slot_id,
            ...payload
        });
        if (error) throw error;
        return { status: 200, data };
    }

    async delete(slot_id) {
        const { data, error } = await this.deleteRepo.execute(slot_id);
        if (error) throw error;
        return { status: 200, data };
    }
}

module.exports = SlotWriteService;
