const express = require("express");
const router = express.Router();
const { fetchAddresses, createAddressHandler, updateAddress, removeAddress } = require("../controllers/address_Controller");

// GET /api/addresses/:userId -> get all addresses for user
router.get("/:userId", fetchAddresses);

// POST /api/addresses -> create new address
router.post("/", createAddressHandler);

// PUT /api/addresses/:addressId -> update address
router.put("/:addressId", updateAddress);

// DELETE /api/addresses/:addressId -> delete address
router.delete("/:addressId", removeAddress);

module.exports = router;
