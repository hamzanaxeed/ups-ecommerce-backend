const fetchAllPayments = async (req, res, readService) => {
    try {
        const response = await readService.getAll();
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const fetchPaymentsByOrder = async (req, res, readService) => {
    try {
        const response = await readService.getByOrder(req.params.orderId);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const createPaymentHandler = async (req, res, writeService) => {
    try {
        const response = await writeService.create(req.body);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updatePaymentStatusHandler = async (req, res, writeService) => {
    try {
        const response = await writeService.updateStatus(req.params.id, req.body);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const removePaymentHandler = async (req, res, writeService) => {
    try {
        const response = await writeService.delete(req.params.id);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    fetchAllPayments,
    fetchPaymentsByOrder,
    createPaymentHandler,
    updatePaymentStatusHandler,
    removePaymentHandler,
};
