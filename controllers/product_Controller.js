const fetchProducts = async (req, res, readService) => {
    try {
        const response = await readService.getAll();
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const fetchProductByIdHandler = async (req, res, readService) => {
    try {
        const response = await readService.getById(req.params.id);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const createProductHandler = async (req, res, writeService) => {
    try {
        const response = await writeService.create(req.body);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateProductHandler = async (req, res, writeService) => {
    try {
        const response = await writeService.update(req.params.id, req.body);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const removeProductHandler = async (req, res, writeService) => {
    try {
        const response = await writeService.delete(req.params.id);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    fetchProducts,
    fetchProductByIdHandler,
    createProductHandler,
    updateProductHandler,
    removeProductHandler,
};
