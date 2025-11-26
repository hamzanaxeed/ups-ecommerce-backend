// src/controllers/slotController.js

const fetchSlots = async (req, res, readService) => {
    try {
        const response = await readService.getAll();
        res.status(response.status).json({ slots: response.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createSlot = async (req, res, writeService) => {
    try {
        const response = await writeService.create(req.body);
        res.status(response.status).json({
            message: "Slot created",
            slot: response.data
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const modifySlot = async (req, res, writeService) => {
    try {
        const response = await writeService.update(req.params.id, req.body);
        res.status(response.status).json({
            message: "Slot updated",
            slot: response.data
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const removeSlot = async (req, res, writeService) => {
    try {
        const response = await writeService.delete(req.params.id);
        res.status(response.status).json({
            message: "Slot deleted",
            result: response.data
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    fetchSlots,
    createSlot,
    modifySlot,
    removeSlot
};
