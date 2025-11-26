const express = require("express");
const router = express.Router();
const { fetchFavourites, toggleFavouriteProduct } = require("../controllers/favourite_Controller");
const { GetFavouritesRepository, ToggleFavouriteRepository } = require("../repositories/favourite_Operations");
const FavouriteService = require("../services/favourite_Service");

const getAllRepo = new GetFavouritesRepository();
const toggleRepo = new ToggleFavouriteRepository();
const service = new FavouriteService({ getAllRepo, toggleRepo });

router.get("/:userId", (req, res) => fetchFavourites(req, res, service));
router.post("/:userId", (req, res) => toggleFavouriteProduct(req, res, service));

module.exports = router;
