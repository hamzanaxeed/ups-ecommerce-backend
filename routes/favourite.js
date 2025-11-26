const express = require("express");
const router = express.Router();
const { fetchFavourites, toggleFavouriteProduct } = require("../controllers/favouriteController");

router.get("/:userId", fetchFavourites);
router.post("/:userId", toggleFavouriteProduct);

module.exports = router;
