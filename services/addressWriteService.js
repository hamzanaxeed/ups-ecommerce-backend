// src/services/addressWriteService.js
class AddressWriteService {
    #addRepo;
    #editRepo;
    #deleteRepo;
    #deactivateRepo;
    #validator;

    constructor({ addRepo, editRepo, deleteRepo, deactivateRepo }, validator) {
        this.#addRepo = addRepo;
        this.#editRepo = editRepo;
        this.#deleteRepo = deleteRepo;
        this.#deactivateRepo = deactivateRepo;
        this.#validator = validator;
    }

    async create(entity) {
        this.#validator.validateAddressData(entity);
        const address = await this.#addRepo.execute(entity);
        return { status: 201, data: { address } };
    }

    async update(addressId, entity) {
        this.#validator.validateAddressId(addressId);
        this.#validator.validateAddressData(entity);
        const updated = await this.#editRepo.execute(addressId, entity);
        return { status: 200, data: { updated } };
    }

    async delete(addressId) {
        this.#validator.validateAddressId(addressId);
        const result = await this.#deleteRepo.execute(addressId);
        return { status: 200, data: { result } };
    }

    async deactivate(addressId) {
        this.#validator.validateAddressId(addressId);
        const result = await this.#deactivateRepo.execute(addressId);
        return { status: 200, data: { result } };
    }
}

module.exports = AddressWriteService;
