class IFavouriteRepository {
    async getAll(userId) { throw new Error("Method must be implemented"); }
    async toggle(userId, productId) { throw new Error("Method must be implemented"); }
}

module.exports = IFavouriteRepository;
