const db = require("../db/supabaseClient");
const IProductRepository = require("../interfaces/IProductRepository");

class GetAllProductsRepository extends IProductRepository {
    async execute() {
        const { data, error } = await db.rpc("get_all_products");
        if (error) throw error;
        return data;
    }
}

class GetProductByIdRepository extends IProductRepository {
    async execute(productId) {
        const { data, error } = await db.rpc("get_product_by_id", { p_product_id: productId });
        if (error) throw error;
        return data;
    }
}

class AddProductRepository extends IProductRepository {
    async execute({ name, price, description, category_id, image, stock }) {
        const { data, error } = await db.rpc("add_product", {
            p_name: name,
            p_price: price,
            p_description: description || null,
            p_category_id: category_id || null,
            p_image: image || null,
            p_stock_quantity: stock || 0,
        });
        if (error) throw error;
        return data;
    }
}

class UpdateProductRepository extends IProductRepository {
    async execute({ product_id, name, price, description, category_id, image, stock }) {
        const { data, error } = await db.rpc("update_product", {
            p_product_id: product_id,
            p_name: name,
            p_price: price,
            p_description: description || null,
            p_category_id: category_id || null,
            p_image: image || null,
            p_stock_quantity: stock || 0,
        });
        if (error) throw error;
        return data;
    }
}

class DeleteProductRepository extends IProductRepository {
    async execute(productId) {
        const { data, error } = await db.rpc("delete_product", { p_product_id: productId });
        if (error) throw error;
        return data;
    }
}

module.exports = {
    GetAllProductsRepository,
    GetProductByIdRepository,
    AddProductRepository,
    UpdateProductRepository,
    DeleteProductRepository,
};
