const db = require("../core/dbClient");
const technician_Interface = require("../interfaces/technician_Interface");
const bcrypt = require("bcrypt");

class AddTechnicianRepository extends technician_Interface {
    async execute({ name, email, username, password, phone_Number }) {
        const password_hash = await bcrypt.hash(password, 10);
        const data = await db.callProcedure("create_technician", {
            p_name: name,
            p_email: email,
            p_username: username,
            p_password_hash: password_hash,
            p_phone_number: phone_Number,
        });
        return data;
    }
}

class EditTechnicianRepository extends technician_Interface {
    async execute(user_Id, { name, email, username, phone_Number }) {
        const data = await db.callProcedure("edit_active_technician", {
            p_user_id: user_Id,
            p_name: name,
            p_email: email,
            p_username: username,
            p_phone_number: phone_Number,
        });
        return data;
    }
}

class DeactivateTechnicianRepository extends technician_Interface {
    async execute(user_Id) {
        const data = await db.callProcedure("deactivate_technician", { p_user_id: user_Id });
        return data;
    }
}

class GetActiveTechnicianRepository extends technician_Interface {
    async execute(user_Id) {
        const data = await db.callProcedure("get_active_technician", { p_user_id: user_Id });
        return data;
    }
}

class GetAllActiveTechniciansRepository extends technician_Interface {
    async execute() {
        const data = await db.callProcedure("get_all_active_technicians");
        return data;
    }
}

class GetAllTechniciansRepository extends technician_Interface {
    async execute() {
        const data = await db.callProcedure("get_all_technicians");
        return data;
    }
}

module.exports = {
    AddTechnicianRepository,
    EditTechnicianRepository,
    DeactivateTechnicianRepository,
    GetActiveTechnicianRepository,
    GetAllActiveTechniciansRepository,
    GetAllTechniciansRepository,
};
