const supabase = require("../db/supabaseClient");

// Create Request
async function createRequest(data) {
	const { user_Id, slot_id, request_date, service_id, description } = data;

	const { data: result, error } = await supabase.rpc("create_request", {
		p_user_id: user_Id,
		p_slot_id: slot_id,
		p_request_date: request_date,
		p_service_id: service_id,
		p_description: description,
	});

	return error ? { error: error.message } : result;
}

// Edit Request
async function editRequest(data) {
	const { request_id, slot_id, request_date, service_id, description } = data;

	const { data: result, error } = await supabase.rpc("edit_request", {
		p_request_id: request_id,
		p_slot_id: slot_id,
		p_request_date: request_date,
		p_service_id: service_id,
		p_description: description,
	});

	return error ? { error: error.message } : result;
}

// Delete Request
async function deleteRequest(request_id) {
	const { data, error } = await supabase.rpc("delete_request", {
		p_request_id: request_id,
	});

	return error ? { error: error.message } : data;
}

// Assign Technician
async function assignTechnician(request_id, technician_id) {
	const { data, error } = await supabase.rpc("assign_technician", {
		p_request_id: request_id,
		p_technician_id: technician_id,
	});

	return error ? { error: error.message } : data;
}

// Decline Request
async function declineRequest(request_id) {
	const { data, error } = await supabase.rpc("decline_request", {
		p_request_id: request_id,
	});

	return error ? { error: error.message } : data;
}

// Complete Request
async function completeRequest(request_id) {
	const { data, error } = await supabase.rpc("complete_request", {
		p_request_id: request_id,
	});

	return error ? { error: error.message } : data;
}

// Get All Requests
async function getAllRequests() {
	const { data, error } = await supabase.rpc("get_all_requests");

	return error ? { error: error.message } : data;
}

// Get Requests by User
async function getRequestsByUserId(user_Id) {
	const { data, error } = await supabase.rpc("get_requests_by_user_id", {
		p_user_id: user_Id,
	});

	return error ? { error: error.message } : data;
}

// Get Requests by Technician
async function getRequestsByTechnicianId(technician_id) {
	const { data, error } = await supabase.rpc("get_requests_by_technician_id", {
		p_technician_id: technician_id,
	});

	return error ? { error: error.message } : data;
}

module.exports = {
	createRequest,
	editRequest,
	deleteRequest,
	assignTechnician,
	declineRequest,
	completeRequest,
	getAllRequests,
	getRequestsByUserId,
	getRequestsByTechnicianId,
};
