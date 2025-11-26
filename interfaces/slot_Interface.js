// src/interfaces/ISlotRepository.js
class ISlotRepository {
    async execute() {
        throw new Error("pure virtual function must be implemented");
    }
}

module.exports = ISlotRepository;
