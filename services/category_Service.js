const CategoryRepository = require("../repositories/CategoryRepository");
const { validateCreateCategory, validateUpdateCategory } = require("../validators/category_Validator");

class CategoryService {
    constructor(repos = { getAllRepo: new CategoryRepository(), getByIdRepo: null, createRepo: null, updateRepo: null, deleteRepo: null }) {
        this.getAllRepo = repos.getAllRepo;
        this.getByIdRepo = repos.getByIdRepo;
        this.createRepo = repos.createRepo;
        this.updateRepo = repos.updateRepo;
        this.deleteRepo = repos.deleteRepo;
    }

    async getAll() {
        const categories = await this.getAllRepo.execute();
        return { status: 200, data: { categories } };
    }

    async getById(id) {
        if (!id) return { status: 400, data: { error: "Category ID required" } };

        const category = await this.getByIdRepo.execute(id);
        if (!category) return { status: 404, data: { error: "Category not found" } };

        return { status: 200, data: { category } };
    }

    async create(data) {
        const errors = validateCreateCategory(data);
        if (errors.length) return { status: 400, data: { error: errors.join(", ") } };

        const category = await this.createRepo.execute(data);
        return { status: 201, data: { category, message: "Category created" } };
    }

    async update(id, data) {
        const errors = validateUpdateCategory(data);
        if (errors.length) return { status: 400, data: { error: errors.join(", ") } };

        const category = await this.updateRepo.execute(id, data);
        return { status: 200, data: { category, message: "Category updated" } };
    }

    async delete(id) {
        if (!id) return { status: 400, data: { error: "Category ID required" } };

        const result = await this.deleteRepo.execute(id);
        return { status: 200, data: { result, message: "Category deleted" } };
    }
}

module.exports = CategoryService;
