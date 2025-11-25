// src/services/addressReadService.js
class AddressReadService {
    #getRepo;
    #validator;

    constructor(getRepo, validator) {
        this.#getRepo = getRepo;
        this.#validator = validator;
    }

    async getAll(userId) {
        this.#validator.validateUserId(userId);
        const addresses = await this.#getRepo.execute(userId);
        return { status: 200, data: { addresses } };
    }
}

module.exports = AddressReadService;
