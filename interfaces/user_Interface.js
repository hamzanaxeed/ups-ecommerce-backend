// src/interfaces/IUserRepository.js
class IUserRepository {
    async execute() {
        throw new Error("pure virtual function must be implemented");
    }
}

module.exports = IUserRepository;
