const FavouriteRepository = require("../repositories/FavouriteRepository");
const { validateToggleFavourite } = require("../validators/FavouriteValidator");

class FavouriteService {
    constructor() { this.repo = new FavouriteRepository(); }

    async getAll(userId) {
        if (!userId) return { status: 400, data: { error: "User ID required" } };
        const favourites = await this.repo.getAll(userId);
        return { status: 200, data: { favourites } };
    }

    async toggle(userId, productId) {
        const errors = validateToggleFavourite({ userId, productId });
        if (errors.length) return { status: 400, data: { error: errors.join(", ") } };

        const result = await this.repo.toggle(userId, productId);
        return { status: 200, data: { message: "Favourite toggled", result } };
    }
}

module.exports = FavouriteService;
