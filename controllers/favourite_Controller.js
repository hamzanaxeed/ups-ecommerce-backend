// Controller functions accept service as DI param
async function fetchFavourites(req, res, service) {
    const response = await service.getAll(req.params.userId);
    res.status(response.status).json(response.data);
}
async function toggleFavouriteProduct(req, res, service) {
    const response = await service.toggle(req.params.userId, req.body.productId);
    res.status(response.status).json(response.data);
}

module.exports = { fetchFavourites, toggleFavouriteProduct };
