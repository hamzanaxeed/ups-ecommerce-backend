const supabase = require("../db/supabaseClient");
const ICategoryRepository = require("../interfaces/ICategoryRepository");

class CategoryRepository extends ICategoryRepository {
    async getAll() {
        const { data, error } = await supabase.rpc("get_all_categories");
        if (error) throw error;
        return data;
    }

    async getById(id) {
        const { data, error } = await supabase.rpc("get_category_with_product_count", { p_category_id: id });
        if (error) throw error;
        return data;
    }

    async create({ name, description, image }) {
        const { data, error } = await supabase.rpc("add_category", {
            p_name: name,
            p_description: description || null,
            p_image: image || null,
        });
        if (error) throw error;
        return data;
    }

    async update(id, { name, description, image }) {
        const { data, error } = await supabase.rpc("update_category", {
            p_category_id: id,
            p_name: name,
            p_description: description || null,
            p_image: image || null,
        });
        if (error) throw error;
        return data;
    }

    async delete(id) {
        const { data, error } = await supabase.rpc("delete_category", { p_category_id: id });
        if (error) throw error;
        return data;
    }
}

module.exports = CategoryRepository;
