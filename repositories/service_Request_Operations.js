const supabase = require("../db/supabaseClient");
const IServiceRequestRepository = require("../interfaces/service_Request_interface");

class CreateRequestRepository extends IServiceRequestRepository {
    async execute({ user_Id, slot_id, request_date, service_id, description }) {
        return supabase.rpc("create_request", {
            p_user_id: user_Id,
            p_slot_id: slot_id,
            p_request_date: request_date,
            p_service_id: service_id,
            p_description: description
        });
    }
}

class EditRequestRepository extends IServiceRequestRepository {
    async execute({ request_id, slot_id, request_date, service_id, description }) {
        return supabase.rpc("edit_request", {
            p_request_id: request_id,
            p_slot_id: slot_id,
            p_request_date: request_date,
            p_service_id: service_id,
            p_description: description
        });
    }
}

class DeleteRequestRepository extends IServiceRequestRepository {
    async execute(request_id) {
        return supabase.rpc("delete_request", { p_request_id: request_id });
    }
}

class AssignTechnicianRepository extends IServiceRequestRepository {
    async execute(request_id, technician_id) {
        return supabase.rpc("assign_technician", { p_request_id: request_id, p_technician_id: technician_id });
    }
}

class DeclineRequestRepository extends IServiceRequestRepository {
    async execute(request_id) {
        return supabase.rpc("decline_request", { p_request_id: request_id });
    }
}

class CompleteRequestRepository extends IServiceRequestRepository {
    async execute(request_id) {
        return supabase.rpc("complete_request", { p_request_id: request_id });
    }
}

class GetAllRequestsRepository extends IServiceRequestRepository {
    async execute() {
        return supabase.rpc("get_all_requests");
    }
}

class GetRequestsByUserRepository extends IServiceRequestRepository {
    async execute(user_Id) {
        return supabase.rpc("get_requests_by_user_id", { p_user_id: user_Id });
    }
}

class GetRequestsByTechnicianRepository extends IServiceRequestRepository {
    async execute(technician_id) {
        return supabase.rpc("get_requests_by_technician_id", { p_technician_id: technician_id });
    }
}

module.exports = {
    CreateRequestRepository,
    EditRequestRepository,
    DeleteRequestRepository,
    AssignTechnicianRepository,
    DeclineRequestRepository,
    CompleteRequestRepository,
    GetAllRequestsRepository,
    GetRequestsByUserRepository,
    GetRequestsByTechnicianRepository
};
