const db = require("../core/dbClient");
const ICategoryRepository = require("../interfaces/category_Interface");

class GetAllCategoriesRepository extends ICategoryRepository {
    async execute() {
        return db.callProcedure("get_all_categories");
    }
}

class GetCategoryByIdRepository extends ICategoryRepository {
    async execute(id) {
        return db.callProcedure("get_category_with_product_count", { p_category_id: id });
    }
}

class CreateCategoryRepository extends ICategoryRepository {
    async execute({ name, description, image }) {
        return db.callProcedure("add_category", {
            p_name: name,
            p_description: description || null,
            p_image: image || null,
        });
    }
}

class UpdateCategoryRepository extends ICategoryRepository {
    async execute(id, { name, description, image }) {
        return db.callProcedure("update_category", {
            p_category_id: id,
            p_name: name,
            p_description: description || null,
            p_image: image || null,
        });
    }
}

class DeleteCategoryRepository extends ICategoryRepository {
    async execute(id) {
        return db.callProcedure("delete_category", { p_category_id: id });
    }
}

module.exports = {
    GetAllCategoriesRepository,
    GetCategoryByIdRepository,
    CreateCategoryRepository,
    UpdateCategoryRepository,
    DeleteCategoryRepository,
};
