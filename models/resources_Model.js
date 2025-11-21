const supabase = require("../db/supabaseClient");

// Get resources for customers (access_level = 'all')
async function getResourcesForCustomers() {
	try {
		const { data, error } = await supabase.rpc("get_resources_for_customers");
		if (error) throw error;
		return data;
	} catch (err) {
		console.error("Error fetching resources for customers:", err.message || err);
		return { error: "Failed to fetch resources for customers" };
	}
}

// Get resources for technicians (access_level IN ('technician', 'all'))
async function getResourcesForTechnicians() {
	try {
		const { data, error } = await supabase.rpc("get_resources_for_technicians");
		if (error) throw error;
		return data;
	} catch (err) {
		console.error("Error fetching resources for technicians:", err.message || err);
		return { error: "Failed to fetch resources for technicians" };
	}
}

// Get all resources (admin)
async function getAllResources() {
	try {
		const { data, error } = await supabase.rpc("get_all_resources");
		if (error) throw error;
		return data;
	} catch (err) {
		console.error("Error fetching all resources:", err.message || err);
		return { error: "Failed to fetch all resources" };
	}
}

// Delete resource
async function deleteResource(resource_id) {
	try {
		const { data, error } = await supabase.rpc("delete_resource", {
			p_resource_id: resource_id,
		});
		if (error) throw error;
		if (data.error) return { error: data.message || data.error };
		return { success: true, resource: data };
	} catch (err) {
		console.error("Error deleting resource:", err.message || err);
		return { error: "Failed to delete resource" };
	}
}

// Edit resource
async function editResource({ resource_id, title, access_level, file_URL, description }) {
	try {
		const { data, error } = await supabase.rpc("edit_resource", {
			p_resource_id: resource_id,
			p_title: title,
			p_access_level: access_level,
			p_file_url: file_URL,
			p_description: description,
		});
		if (error) throw error;
		if (data.error) return { error: data.message || data.error };
		return { success: true, resource: data };
	} catch (err) {
		console.error("Error editing resource:", err.message || err);
		return { error: "Failed to edit resource" };
	}
}

// Create resource
async function createResource({ title, uploaded_by, file_URL, description, access_level }) {
	try {
		const { data, error } = await supabase.rpc("create_resource", {
			p_title: title,
			p_uploaded_by: uploaded_by,
			p_file_url: file_URL,
			p_description: description,
			p_access_level: access_level,
		});
		if (error) throw error;
		if (data.error) return { error: data.message || data.error };
		return { success: true, resource: data };
	} catch (err) {
		console.error("Error creating resource:", err.message || err);
		return { error: "Failed to create resource" };
	}
}

module.exports = {
	getResourcesForCustomers,
	getResourcesForTechnicians,
	getAllResources,
	deleteResource,
	editResource,
	createResource,
};
