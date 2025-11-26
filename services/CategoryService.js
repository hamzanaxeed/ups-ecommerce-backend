const CategoryRepository = require("../repositories/CategoryRepository");
const { validateCreateCategory, validateUpdateCategory } = require("../validators/CategoryValidator");

class CategoryService {
    constructor() { this.repo = new CategoryRepository(); }

    async getAll() {
        const categories = await this.repo.getAll();
        return { status: 200, data: { categories } };
    }

    async getById(id) {
        if (!id) return { status: 400, data: { error: "Category ID required" } };

        const category = await this.repo.getById(id);
        if (!category) return { status: 404, data: { error: "Category not found" } };

        return { status: 200, data: { category } };
    }

    async create(data) {
        const errors = validateCreateCategory(data);
        if (errors.length) return { status: 400, data: { error: errors.join(", ") } };

        const category = await this.repo.create(data);
        return { status: 201, data: { category, message: "Category created" } };
    }

    async update(id, data) {
        const errors = validateUpdateCategory(data);
        if (errors.length) return { status: 400, data: { error: errors.join(", ") } };

        const category = await this.repo.update(id, data);
        return { status: 200, data: { category, message: "Category updated" } };
    }

    async delete(id) {
        if (!id) return { status: 400, data: { error: "Category ID required" } };

        const result = await this.repo.delete(id);
        return { status: 200, data: { result, message: "Category deleted" } };
    }
}

module.exports = CategoryService;
