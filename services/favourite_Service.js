const FavouriteRepository = require("../repositories/favourite_Operations");
const { validateToggleFavourite } = require("../validators/favourite_Validator");

class FavouriteService {
    constructor(repos = { getAllRepo: new FavouriteRepository(), toggleRepo: null }) {
        this.getAllRepo = repos.getAllRepo;
        this.toggleRepo = repos.toggleRepo;
    }

    async getAll(userId) {
        if (!userId) return { status: 400, data: { error: "User ID required" } };
        const favourites = await this.getAllRepo.execute(userId);
        return { status: 200, data: { favourites } };
    }

    async toggle(userId, productId) {
        const errors = validateToggleFavourite({ userId, productId });
        if (errors.length) return { status: 400, data: { error: errors.join(", ") } };

        const result = await this.toggleRepo.execute(userId, productId);
        return { status: 200, data: { message: "Favourite toggled", result } };
    }
}

module.exports = FavouriteService;
