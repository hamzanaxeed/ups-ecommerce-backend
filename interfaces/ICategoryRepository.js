class ICategoryRepository {
    async getAll() { throw new Error("Method must be implemented"); }
    async getById(id) { throw new Error("Method must be implemented"); }
    async create(data) { throw new Error("Method must be implemented"); }
    async update(id, data) { throw new Error("Method must be implemented"); }
    async delete(id) { throw new Error("Method must be implemented"); }
}

module.exports = ICategoryRepository;
