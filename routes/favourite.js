const express = require("express");
const router = express.Router();
const { fetchFavourites, toggleFavouriteProduct } = require("../controllers/favourite_Controller");

// GET /api/favourites/:userId -> get all favourites for user
router.get("/:userId", fetchFavourites);

// POST /api/favourites/:userId -> toggle favourite for product
router.post("/:userId", toggleFavouriteProduct);

module.exports = router;
