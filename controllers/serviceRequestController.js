const fetchAllRequests = async (req, res, readService) => {
    try {
        const response = await readService.getAll();
        res.status(response.status).json({ requests: response.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const fetchRequestsByUser = async (req, res, readService) => {
    try {
        const { user_Id } = req.params;
        const response = await readService.getByUser(user_Id);
        res.status(response.status).json({ requests: response.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const fetchRequestsByTechnician = async (req, res, readService) => {
    try {
        const { technician_id } = req.params;
        const response = await readService.getByTechnician(technician_id);
        res.status(response.status).json({ requests: response.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createServiceRequest = async (req, res, writeService) => {
    try {
        const response = await writeService.create(req.body);
        res.status(response.status).json({ message: "Request created", request: response.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateServiceRequest = async (req, res, writeService) => {
    try {
        const response = await writeService.update(req.params.request_id, req.body);
        res.status(response.status).json({ message: "Request updated", request: response.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const removeServiceRequest = async (req, res, writeService) => {
    try {
        const response = await writeService.delete(req.params.request_id);
        res.status(response.status).json({ message: "Request deleted", result: response.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const assignTechnicianToRequest = async (req, res, writeService) => {
    try {
        const response = await writeService.assignTechnician(req.params.request_id, req.body.technician_id);
        res.status(response.status).json({ message: "Technician assigned", result: response.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const declineServiceRequest = async (req, res, writeService) => {
    try {
        const response = await writeService.decline(req.params.request_id);
        res.status(response.status).json({ message: "Request declined", result: response.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const completeServiceRequest = async (req, res, writeService) => {
    try {
        const response = await writeService.complete(req.params.request_id);
        res.status(response.status).json({ message: "Request completed", result: response.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    fetchAllRequests,
    fetchRequestsByUser,
    fetchRequestsByTechnician,
    createServiceRequest,
    updateServiceRequest,
    removeServiceRequest,
    assignTechnicianToRequest,
    declineServiceRequest,
    completeServiceRequest
};
