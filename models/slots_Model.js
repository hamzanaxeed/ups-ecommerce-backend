const supabase = require("../db/supabaseClient");

// Add a new slot
async function addSlot({ slot_time }) {
	const { data, error } = await supabase.rpc("add_slot", {
		p_slot_time: slot_time,
	});
	if (error) throw error;
	return data;
}

// Update a slot
async function updateSlot({ slot_id, slot_time }) {
	const { data, error } = await supabase.rpc("update_slot", {
		p_slot_id: slot_id,
		p_slot_time: slot_time,
	});
	if (error) throw error;
	return data;
}

// Delete a slot
async function deleteSlot(slot_id) {
	const { data, error } = await supabase.rpc("delete_slot", {
		p_slot_id: slot_id,
	});
	if (error) throw error;
	return data;
}

// Get all slots
async function getAllSlots() {
	const { data, error } = await supabase.from("slots").select("*");
	if (error) throw error;
	return data;
}

module.exports = { addSlot, updateSlot, deleteSlot, getAllSlots };

