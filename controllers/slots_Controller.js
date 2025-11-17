
const { addSlot, updateSlot, deleteSlot, getAllSlots } = require("../models/slots_Model");

async function fetchSlots(req, res) {
	try {
		const slots = await getAllSlots();
		return res.json({ slots });
	} catch (err) {
		console.error("Error fetching slots:", err.message || err);
		return res.status(500).json({ error: "Failed to fetch slots" });
	}
}

async function createSlot(req, res) {
	try {
		const { slot_time } = req.body;
		if (!slot_time) return res.status(400).json({ error: "slot_time required" });

		const created = await addSlot({ slot_time });
		return res.status(201).json({ message: "Slot created", slot: created });
	} catch (err) {
		console.error("Error creating slot:", err.message || err);
		return res.status(500).json({ error: "Failed to create slot" });
	}
}

async function modifySlot(req, res) {
	try {
		const id = req.params.id;
		const { slot_time } = req.body;
		if (!id) return res.status(400).json({ error: "Slot id required" });

		const updated = await updateSlot({ slot_id: id, slot_time });
		return res.json({ message: "Slot updated", slot: updated });
	} catch (err) {
		console.error("Error updating slot:", err.message || err);
		return res.status(500).json({ error: "Failed to update slot" });
	}
}

async function removeSlot(req, res) {
	try {
		const id = req.params.id;
		if (!id) return res.status(400).json({ error: "Slot id required" });

		await deleteSlot(id);
		return res.json({ message: "Slot deleted" });
	} catch (err) {
		console.error("Error deleting slot:", err.message || err);
		return res.status(500).json({ error: "Failed to delete slot" });
	}
}

module.exports = { fetchSlots, createSlot, modifySlot, removeSlot };

