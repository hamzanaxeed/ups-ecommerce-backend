// src/controllers/serviceController.js

const fetchServices = async (req, res, readService) => {
    try {
        const response = await readService.getAll();
        res.status(response.status).json({ services: response.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const fetchAvailableServices = async (req, res, readService) => {
    try {
        const response = await readService.getAvailable();
        res.status(response.status).json({ services: response.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const fetchServiceById = async (req, res, readService) => {
    try {
        const response = await readService.getById(req.params.id);
        res.status(response.status).json({ service: response.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createService = async (req, res, writeService) => {
    try {
        const response = await writeService.create(req.body);
        res.status(response.status).json({
            message: "Service created",
            service: response.data
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const modifyService = async (req, res, writeService) => {
    try {
        const response = await writeService.update(req.params.id, req.body);
        res.status(response.status).json({
            message: "Service updated",
            service: response.data
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const removeService = async (req, res, writeService) => {
    try {
        const response = await writeService.delete(req.params.id);
        res.status(response.status).json({
            message: "Service deleted",
            result: response.data
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    fetchServices,
    fetchAvailableServices,
    fetchServiceById,
    createService,
    modifyService,
    removeService
};
