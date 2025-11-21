const bcrypt = require("bcrypt");
const supabase = require("../db/supabaseClient");

// Create a technician
async function createTechnician({ name, email, username, password, phone_Number }) {
	try {
		const password_hash = await bcrypt.hash(password, 10);

		const { data, error } = await supabase.rpc("create_technician", {
			p_name: name,
			p_email: email,
			p_username: username,
			p_password_hash: password_hash,
			p_phone_number: phone_Number,
		});

		if (error) throw error;
		return data;
	} catch (err) {
		console.error("Error creating technician:", err.message || err);
		return { error: "Failed to create technician" };
	}
}

// Deactivate technician
async function deactivateTechnician(user_Id) {
	try {
		const { data, error } = await supabase.rpc("deactivate_technician", {
			p_user_id: user_Id,
		});
		if (error) throw error;
		return data;
	} catch (err) {
		console.error("Error deactivating technician:", err.message || err);
		return { error: "Failed to deactivate technician" };
	}
}

// Edit active technician
async function editActiveTechnician({ user_Id, name, email, username, phone_Number }) {
	try {
		const { data, error } = await supabase.rpc("edit_active_technician", {
			p_user_id: user_Id,
			p_name: name,
			p_email: email,
			p_username: username,
			p_phone_number: phone_Number,
		});
		if (error) throw error;
		return data;
	} catch (err) {
		console.error("Error editing technician:", err.message || err);
		return { error: "Failed to edit technician" };
	}
}

// Get active technician by ID
async function getActiveTechnician(user_Id) {
	try {
		const { data, error } = await supabase.rpc("get_active_technician", {
			p_user_id: user_Id,
		});
		if (error) throw error;
		return data;
	} catch (err) {
		console.error("Error fetching active technician:", err.message || err);
		return { error: "Failed to fetch active technician" };
	}
}

// Get all active technicians
async function getAllActiveTechnicians() {
	try {
		const { data, error } = await supabase.rpc("get_all_active_technicians");
		if (error) throw error;
		return data;
	} catch (err) {
		console.error("Error fetching all active technicians:", err.message || err);
		return { error: "Failed to fetch active technicians" };
	}
}

// Get all technicians
async function getAllTechnicians() {
	try {
		const { data, error } = await supabase.rpc("get_all_technicians");
		if (error) throw error;
		return data;
	} catch (err) {
		console.error("Error fetching all technicians:", err.message || err);
		return { error: "Failed to fetch all technicians" };
	}
}

module.exports = {
	createTechnician,
	deactivateTechnician,
	editActiveTechnician,
	getActiveTechnician,
	getAllActiveTechnicians,
	getAllTechnicians,
};
