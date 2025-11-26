const supabase = require("../db/supabaseClient");
const IFavouriteRepository = require("../interfaces/IFavouriteRepository");

class FavouriteRepository extends IFavouriteRepository {
    async getAll(userId) {
        const { data, error } = await supabase.rpc("get_favourites", { userid: userId });
        if (error) throw error;
        return data;
    }

    async toggle(userId, productId) {
        const { data, error } = await supabase.rpc("toggle_favourite", {
            userid: userId,
            productid: productId,
        });
        if (error) throw error;
        return data;
    }
}

module.exports = FavouriteRepository;
