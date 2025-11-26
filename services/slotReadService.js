// src/services/slotReadService.js
class SlotReadService {
    constructor({ allRepo }) {
        this.allRepo = allRepo;
    }

    async getAll() {
        const { data, error } = await this.allRepo.execute();
        if (error) throw error;
        return { status: 200, data };
    }
}

module.exports = SlotReadService;
