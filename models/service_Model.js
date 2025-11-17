const supabase = require("../db/supabaseClient");

// Add a new service
async function addService({ service_name, description, price, duration, availability }) {
	const { data, error } = await supabase.rpc("add_service", {
		p_service_name: service_name,
		p_description: description,
		p_price: price,
		p_duration: duration,
		p_availability: availability,
	});
	if (error) throw error;
	return data;
}

// Update existing service
async function updateService({ service_id, service_name, description, price, duration, availability }) {
	const { data, error } = await supabase.rpc("update_service", {
		p_service_id: service_id,
		p_service_name: service_name,
		p_description: description,
		p_price: price,
		p_duration: duration,
		p_availability: availability,
	});
	if (error) throw error;
	return data;
}

// Delete a service
async function deleteService(service_id) {
	const { data, error } = await supabase.rpc("delete_service", {
		p_service_id: service_id,
	});
	if (error) throw error;
	return data;
}

// Get all services
async function getAllServices() {
	const { data, error } = await supabase.from("services").select("*");
	if (error) throw error;
	return data;
}

// Get service by id
async function getServiceById(service_id) {
	const { data, error } = await supabase.from("services").select("*").eq("id", service_id).single();
	if (error) throw error;
	return data;
}

async function getAvailableServices(onlyAvailable = false) {
  if (onlyAvailable) {
    const { data, error } = await supabase.rpc('get_available_services');
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase.from('services').select('*');
    if (error) throw error;
    return data;
  }
}


module.exports = { addService, updateService, deleteService, getAllServices, getServiceById,getAvailableServices };

