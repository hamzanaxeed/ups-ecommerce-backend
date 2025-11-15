const supabase = require("../db/supabaseClient");

// ================================
// 1️⃣ Get ALL services (Admin)
// ================================
async function getAllServices() {
  const { data, error } = await supabase.rpc("get_all_services");

  if (error) throw error;
  return data;
}

// =====================================
// 2️⃣ Get ONLY available services (Customer)
// =====================================
async function getAvailableServices() {
  const { data, error } = await supabase.rpc("get_available_services");

  if (error) throw error;
  return data;
}

// ================================
// 2️⃣.5 Get service by ID
// ================================
async function getServiceById(serviceId) {
  const { data, error } = await supabase.rpc("get_service_by_id", {
    p_service_id: serviceId,
  });

  if (error) throw error;
  return data;
}

// ================================
// 3️⃣ Create new service (Admin)
// ================================
async function createService(serviceData) {
  const {
    service_name,
    description,
    price,
    duration,
    availability,
  } = serviceData;

  const { data, error } = await supabase.rpc("create_service", {
    p_service_name: service_name,
    p_description: description,
    p_price: price,
    p_duration: duration,       // example: "30 minutes"
    p_availability: availability,
  });

  if (error) throw error;
  return data;
}

// ================================
// 4️⃣ Edit existing service (Admin)
// ================================
async function editService(serviceId, serviceData) {
  const {
    service_name,
    description,
    price,
    duration,
    availability,
  } = serviceData;

  const { data, error } = await supabase.rpc("edit_service", {
    p_service_id: serviceId,
    p_service_name: service_name,
    p_description: description,
    p_price: price,
    p_duration: duration,
    p_availability: availability,
  });

  if (error) throw error;
  return data;
}

// ================================
// 5️⃣ Delete service (Admin)
// ================================
async function deleteService(serviceId) {
  const { data, error } = await supabase.rpc("delete_service", {
    p_service_id: serviceId,
  });

  if (error) throw error;
  return data;
}

module.exports = {
  getAllServices,
  getAvailableServices,
  getServiceById,
  createService,
  editService,
  deleteService,
};
