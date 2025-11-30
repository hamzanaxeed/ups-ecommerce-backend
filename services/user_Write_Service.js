const verifyUserId = require("../utils/verifyUserId");

class UserWriteService {
    #addRepo;
    #editRepo;
    #deactivateRepo;
    #activateRepo;
    #validator;

    constructor({ addRepo, editRepo, deactivateRepo, activateRepo }, validator) {
        this.#addRepo = addRepo;
        this.#editRepo = editRepo;
        this.#deactivateRepo = deactivateRepo;
        this.#activateRepo = activateRepo;
        this.#validator = validator;
    }

    async create(entity) {
        this.#validator.validateUserData(entity);
        try {
            const data = await this.#addRepo.execute(entity);
            const customer = data && data.response ? (Array.isArray(data.response) ? data.response[0] : data.response) : data;
            return { status: 201, data: { customer } };
        } catch (err) {
            return { status: 400, data: { error: err.message || err } };
        }
    }

    async update(userId, entity) {
        this.#validator.validateUserId(userId);
        const exists = await verifyUserId(userId);
        if (!exists) return { status: 404, data: { error: "User not found or inactive" } };
        this.#validator.validateUserData(entity, { allowPassword: true });
        try {
            const data = await this.#editRepo.execute(userId, entity);
            const customer = data && data.response ? (Array.isArray(data.response) ? data.response[0] : data.response) : data;
            return { status: 200, data: { customer } };
        } catch (err) {
            return { status: 400, data: { error: err.message || err } };
        }
    }

    async deactivate(userId) {
        this.#validator.validateUserId(userId);
        const exists = await verifyUserId(userId);
        if (!exists) return { status: 404, data: { error: "User not found or inactive" } };
        try {
            const data = await this.#deactivateRepo.execute(userId);
            const result = data && data.response ? (Array.isArray(data.response) ? data.response : data.response) : data;
            return { status: 200, data: { result } };
        } catch (err) {
            return { status: 400, data: { error: err.message || err } };
        }
    }

    async activate(userId) {
        // For activation, we should allow activating an inactive user; verify they exist even if inactive
        this.#validator.validateUserId(userId);
        const exists = await verifyUserId(userId, { requireActive: false });
        if (!exists) return { status: 404, data: { error: "User not found" } };
        try {
            const data = await this.#activateRepo.execute(userId);
            const result = data && data.response ? (Array.isArray(data.response) ? data.response : data.response) : data;
          console.log("Activation result:", result);
            return { status: 200, data: { result } };
        } catch (err) {
            return { status: 400, data: { error: err.message || err } };
        }
    }
}

module.exports = UserWriteService;
