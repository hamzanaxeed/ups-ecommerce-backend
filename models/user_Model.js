const supabase = require("../db/supabaseClient");

// Create a new customer
async function createCustomer({ name, email, username, password_hash, phone_Number }) {
	const { data, error } = await supabase.rpc("create_customer", {
		p_name: name,
		p_email: email,
		p_username: username,
		p_password_hash: password_hash,
		p_phone_number: phone_Number,
	});
	if (error) throw error;
	return data;
}

// Edit active customer
async function editActiveCustomer({ user_Id, name, email, username, phone_Number }) {
	const { data, error } = await supabase.rpc("edit_active_customer", {
		p_user_id: user_Id,
		p_name: name,
		p_email: email,
		p_username: username,
		p_phone_number: phone_Number,
	});
	if (error) throw error;
	return data;
}

// Deactivate customer
async function deactivateCustomer(user_Id) {
	const { data, error } = await supabase.rpc("deactivate_customer", {
		p_user_id: user_Id,
	});
	if (error) throw error;
	return data;
}

// Get all customers
async function getAllCustomers() {
	const { data, error } = await supabase.rpc("get_all_customers");
	if (error) throw error;
	return data;
}

// Get all active customers
async function getAllActiveCustomers() {
	const { data, error } = await supabase.rpc("get_all_active_customers");
	if (error) throw error;
	return data;
}

// Get active customer by ID
async function getActiveCustomer(user_Id) {
	const { data, error } = await supabase.rpc("get_active_customer", {
		p_user_id: user_Id,
	});
	if (error) throw error;
	return data;
}

module.exports = {
	createCustomer,
	editActiveCustomer,
	deactivateCustomer,
	getAllCustomers,
	getAllActiveCustomers,
	getActiveCustomer,
};
