function validateToggleFavourite(data) {
    const errors = [];
    if (!data.userId) errors.push("User ID required");
    if (!data.productId) errors.push("Product ID required");
    return errors;
}

module.exports = { validateToggleFavourite };
