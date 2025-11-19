const supabase = require("../db/supabaseClient");

// Get all addresses for a user
async function getAddresses(userId) {
	const { data, error } = await supabase.rpc("get_addresses", {
		p_user_id: userId,
	});
	if (error) throw error;
	return data;
}

// Create a new address
async function createAddress({ user_id, city, country, detail }) {
	const { data, error } = await supabase.rpc("create_address", {
		p_user_id: user_id,
		p_city: city,
		p_country: country,
		p_detail: detail,
	});
	if (error) throw error;
	return data;
}

// Update an address
async function editAddress({ addressId, city, country, detail }) {
	const { data, error } = await supabase.rpc("edit_address", {
		p_address_id: Number(addressId),
		p_city: city,
		p_country: country,
		p_detail: detail,
	});
    console.log(addressId)
    console.log(city);
    console.log(country);
    console.log(data);
    console.log(detail);
	if (error) throw error;
	return data;
}

// Delete an address
async function deleteAddress(addressId) {
	const { data, error } = await supabase.rpc("delete_address", {
		p_address_id: Number(addressId),
	});
	if (error) throw error;
	return data;
}

module.exports = { getAddresses, createAddress, editAddress, deleteAddress };
