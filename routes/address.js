// src/routes/addressRoutes.js
const express = require("express");
const router = express.Router();

const {
    fetchAddresses,
    createAddressHandler,
    updateAddress,
    removeAddress,
    deactivateAddressHandler
} = require("../controllers/address_Controller");

const {
    AddAddressRepository,
    EditAddressRepository,
    DeleteAddressRepository,
    DeactivateAddressRepository,
    GetAddressesRepository
} = require("../repositories/address_Operations");

const AddressReadService = require("../services/address_Read_Service");
const AddressWriteService = require("../services/address_Write_Service");
const AddressValidator = require("../validators/address_Validator");

// Repositories
const getRepo = new GetAddressesRepository();
const addRepo = new AddAddressRepository();
const editRepo = new EditAddressRepository();
const deleteRepo = new DeleteAddressRepository();
const deactivateRepo = new DeactivateAddressRepository();

// Services
const readService = new AddressReadService(getRepo, AddressValidator);
const writeService = new AddressWriteService({ addRepo, editRepo, deleteRepo, deactivateRepo }, AddressValidator);

// Routes
router.get("/:userId", (req, res) => fetchAddresses(req, res, readService));
router.post("/", (req, res) => createAddressHandler(req, res, writeService));
router.put("/:addressId", (req, res) => updateAddress(req, res, writeService));
router.delete("/:addressId", (req, res) => removeAddress(req, res, writeService));
router.patch("/deactivate/:addressId", (req, res) => deactivateAddressHandler(req, res, writeService));

module.exports = router;
