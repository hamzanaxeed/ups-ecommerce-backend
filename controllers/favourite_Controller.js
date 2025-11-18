const { getFavourites, toggleFavourite } = require("../models/favourite_Model");

// Get all favourites for a user
async function fetchFavourites(req, res) {
	try {
		const userId = req.params.userId;
		if (!userId) {
			return res.status(400).json({ error: "User ID required" });
		}

		const favourites = await getFavourites(userId);
		return res.json({ favourites });
	} catch (err) {
		console.error("Error fetching favourites:", err.message || err);
		return res.status(500).json({ error: "Failed to fetch favourites" });
	}
}

// Toggle favourite for a product
async function toggleFavouriteProduct(req, res) {
	try {
		const userId = req.params.userId;
		const { productId } = req.body;

		if (!userId || !productId) {
			return res.status(400).json({ error: "User ID and Product ID required" });
		}

		const result = await toggleFavourite(userId, productId);
		return res.json({ message: "Favourite toggled", result });
	} catch (err) {
		console.error("Error toggling favourite:", err.message || err);
		return res.status(500).json({ error: "Failed to toggle favourite" });
	}
}

module.exports = { fetchFavourites, toggleFavouriteProduct };
