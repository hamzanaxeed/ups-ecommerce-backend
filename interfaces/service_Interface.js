// src/interfaces/IServiceRepository.js
class IServiceRepository {
    async execute() {
        throw new Error("pure virtual function must be implemented");
    }
}

module.exports = IServiceRepository;
