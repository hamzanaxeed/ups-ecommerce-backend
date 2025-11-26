const fetchResourcesForCustomers = async (req, res, readService) => {
    try {
        const response = await readService.getForCustomers();
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const fetchResourcesForTechnicians = async (req, res, readService) => {
    try {
        const response = await readService.getForTechnicians();
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const fetchAllResources = async (req, res, readService) => {
    try {
        const response = await readService.getAll();
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const createResourceHandler = async (req, res, writeService) => {
    try {
        const response = await writeService.create(req.body);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateResource = async (req, res, writeService) => {
    try {
        const response = await writeService.update(req.params.resource_id, req.body);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const removeResource = async (req, res, writeService) => {
    try {
        const response = await writeService.delete(req.params.resource_id);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    fetchResourcesForCustomers,
    fetchResourcesForTechnicians,
    fetchAllResources,
    createResourceHandler,
    updateResource,
    removeResource
};
