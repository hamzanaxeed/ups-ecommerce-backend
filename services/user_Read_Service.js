const verifyUserId = require("../utils/verifyUserId");

class UserReadService {
    #getActiveRepo;
    #getAllRepo;
    #getAllActiveRepo;
    #validator;

    constructor(getActiveRepo, getAllRepo, getAllActiveRepo, validator) {
        this.#getActiveRepo = getActiveRepo;
        this.#getAllRepo = getAllRepo;
        this.#getAllActiveRepo = getAllActiveRepo;
        this.#validator = validator;
    }

    async getAll() {
        try {
            const data = await this.#getAllRepo.execute();
            const customers = data && data.response ? data.response : data;
            return { status: 200, data: { customers } };
        } catch (err) {
            return { status: 400, data: { error: err.message || err } };
        }
    }

    async getAllActive() {
        try {
            const data = await this.#getAllActiveRepo.execute();
            const customers = data && data.response ? data.response : data;
            return { status: 200, data: { customers } };
        } catch (err) {
            return { status: 400, data: { error: err.message || err } };
        }
    }

    async getActive(userId) {
        this.#validator.validateUserId(userId);
        const exists = await verifyUserId(userId);
        if (!exists) return { status: 404, data: { error: "User not found or inactive" } };
        try {
            const data = await this.#getActiveRepo.execute(userId);
            const customer = data && data.response ? (Array.isArray(data.response) ? data.response[0] : data.response) : data;
            if (!customer) return { status: 404, data: { error: "Customer not found" } };
            return { status: 200, data: { customer } };
        } catch (err) {
            return { status: 400, data: { error: err.message || err } };
        }
    }
}

module.exports = UserReadService;
