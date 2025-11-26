// src/repositories/serviceRepository.js
const supabase = require("../db/supabaseClient");
const IServiceRepository = require("../interfaces/service_Interface");

// CREATE
class CreateServiceRepository extends IServiceRepository {
    async execute(payload) {
        return supabase.rpc("add_service", {
            p_service_name: payload.service_name,
            p_description: payload.description,
            p_price: payload.price,
            p_duration: payload.duration,
            p_availability: payload.availability
        });
    }
}

// UPDATE
class UpdateServiceRepository extends IServiceRepository {
    async execute(payload) {
        return supabase.rpc("update_service", {
            p_service_id: payload.service_id,
            p_service_name: payload.service_name,
            p_description: payload.description,
            p_price: payload.price,
            p_duration: payload.duration,
            p_availability: payload.availability
        });
    }
}

// DELETE
class DeleteServiceRepository extends IServiceRepository {
    async execute(service_id) {
        return supabase.rpc("delete_service", { p_service_id: service_id });
    }
}

// GET ALL SERVICES
class GetAllServicesRepository extends IServiceRepository {
    async execute() {
        return supabase.from("services").select("*");
    }
}

// GET SERVICE BY ID
class GetServiceByIdRepository extends IServiceRepository {
    async execute(service_id) {
        return supabase.from("services").select("*").eq("id", service_id).single();
    }
}

// GET AVAILABLE SERVICES
class GetAvailableServicesRepository extends IServiceRepository {
    async execute() {
        return supabase.rpc("get_available_services");
    }
}

module.exports = {
    CreateServiceRepository,
    UpdateServiceRepository,
    DeleteServiceRepository,
    GetAllServicesRepository,
    GetServiceByIdRepository,
    GetAvailableServicesRepository
};
