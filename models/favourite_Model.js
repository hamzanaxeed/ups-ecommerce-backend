const supabase = require("../db/supabaseClient");

// Get all favourites for a user
async function getFavourites(userId) {
	const { data, error } = await supabase.rpc("get_favourites", {
		userid: userId,
	});
	if (error) {
		console.log("Error:", error);
		throw error;
	}
	return data;
}

// Toggle favourite status for a product
async function toggleFavourite(userId, productId) {
	const { data, error } = await supabase.rpc("toggle_favourite", {
		userid: userId,
		productid: productId,
	});
	if (error) {
		console.log("Error:", error);
		throw error;
	}
	return data; // { status: "added" } or { status: "removed" }
}

module.exports = { getFavourites, toggleFavourite };
