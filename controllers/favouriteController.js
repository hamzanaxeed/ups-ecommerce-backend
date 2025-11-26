const FavouriteService = require("../services/FavouriteService");
const service = new FavouriteService();

async function fetchFavourites(req, res) {
    const response = await service.getAll(req.params.userId);
    res.status(response.status).json(response.data);
}

async function toggleFavouriteProduct(req, res) {
    const response = await service.toggle(req.params.userId, req.body.productId);
    res.status(response.status).json(response.data);
}

module.exports = { fetchFavourites, toggleFavouriteProduct };
