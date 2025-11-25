// src/controllers/addressController.js
const AddressValidator = require("../validators/addressValidator");

const fetchAddresses = async (req, res, readService) => {
    try {
        const userId = req.params.userId;
        const response = await readService.getAll(userId);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const createAddressHandler = async (req, res, writeService) => {
    try {
        const response = await writeService.create(req.body);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateAddress = async (req, res, writeService) => {
    try {
        const response = await writeService.update(req.params.addressId, req.body);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const removeAddress = async (req, res, writeService) => {
    try {
        const response = await writeService.delete(req.params.addressId);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deactivateAddressHandler = async (req, res, writeService) => {
    try {
        const response = await writeService.deactivate(req.params.addressId);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    fetchAddresses,
    createAddressHandler,
    updateAddress,
    removeAddress,
    deactivateAddressHandler
};
