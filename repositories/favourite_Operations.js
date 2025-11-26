const db = require("../core/dbClient");
const IFavouriteRepository = require("../interfaces/favourite_Interface");

class GetFavouritesRepository extends IFavouriteRepository {
    async execute(userId) {
        return db.callProcedure("get_favourites", { userid: userId });
    }
}

class ToggleFavouriteRepository extends IFavouriteRepository {
    async execute(userId, productId) {
        return db.callProcedure("toggle_favourite", { userid: userId, productid: productId });
    }
}

module.exports = { GetFavouritesRepository, ToggleFavouriteRepository };
