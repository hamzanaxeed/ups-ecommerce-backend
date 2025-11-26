// src/services/addressReadService.js
const verifyUserId = require("../utils/verifyUserId");

class AddressReadService {
    #getRepo;
    #validator;

    constructor(getRepo, validator) {
        this.#getRepo = getRepo;
        this.#validator = validator;
    }

    async getAll(userId) {
        this.#validator.validateUserId(userId);
        const exists = await verifyUserId(userId);
        if (!exists) throw new Error("User not found or inactive");
        const addresses = await this.#getRepo.execute(userId);
        return { status: 200, data: { addresses } };
    }
}

module.exports = AddressReadService;
