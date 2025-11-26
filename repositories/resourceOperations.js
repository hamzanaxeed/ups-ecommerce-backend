const db = require("../db/supabaseClient");
const IResourceRepository = require("../interfaces/IResourceRepository");

class GetResourcesForCustomersRepository extends IResourceRepository {
    async execute() {
        return db.rpc("get_resources_for_customers");
    }
}

class GetResourcesForTechniciansRepository extends IResourceRepository {
    async execute() {
        return db.rpc("get_resources_for_technicians");
    }
}

class GetAllResourcesRepository extends IResourceRepository {
    async execute() {
        return db.rpc("get_all_resources");
    }
}

class CreateResourceRepository extends IResourceRepository {
    async execute({ title, uploaded_by, file_URL, description, access_level }) {
        return db.rpc("create_resource", {
            p_title: title,
            p_uploaded_by: uploaded_by,
            p_file_url: file_URL,
            p_description: description,
            p_access_level: access_level
        });
    }
}

class EditResourceRepository extends IResourceRepository {
    async execute({ resource_id, title, access_level, file_URL, description }) {
        return db.rpc("edit_resource", {
            p_resource_id: Number(resource_id),
            p_title: title,
            p_access_level: access_level,
            p_file_url: file_URL,
            p_description: description
        });
    }
}

class DeleteResourceRepository extends IResourceRepository {
    async execute(resource_id) {
        return db.rpc("delete_resource", { p_resource_id: Number(resource_id) });
    }
}

module.exports = {
    GetResourcesForCustomersRepository,
    GetResourcesForTechniciansRepository,
    GetAllResourcesRepository,
    CreateResourceRepository,
    EditResourceRepository,
    DeleteResourceRepository
};
