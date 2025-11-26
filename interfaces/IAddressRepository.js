// src/interfaces/IAddressRepository.js
class IAddressRepository {
    async execute() {
        throw new Error("pure virtual function must be implemented");
    }
}

module.exports = IAddressRepository;