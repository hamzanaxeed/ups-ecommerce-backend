const db = require("../core/dbClient");
const IUserRepository = require("../interfaces/user_Interface");
const bcrypt = require("bcrypt");

class AddUserRepository extends IUserRepository {
    async execute({ name, email, username, password, phone_Number }) {
        const password_hash = await bcrypt.hash(password, 10);
        return db.callProcedure("create_customer", {
            p_name: name,
            p_email: email,
            p_username: username,
            p_password_hash: password_hash,
            p_phone_number: phone_Number,
        });
    }
}

class EditUserRepository extends IUserRepository {
    async execute(user_Id, { name, email, username, phone_Number }) {
        return db.callProcedure("edit_active_customer", {
            p_user_id: user_Id,
            p_name: name,
            p_email: email,
            p_username: username,
            p_phone_number: phone_Number,
        });
    }
}

class DeactivateUserRepository extends IUserRepository {
    async execute(user_Id) {
        return db.callProcedure("deactivate_customer", { p_user_id: user_Id });
    }
}

class GetActiveUserRepository extends IUserRepository {
    async execute(user_Id) {
        return db.callProcedure("get_active_customer", { p_user_id: user_Id });
    }
}

class GetAllActiveUsersRepository extends IUserRepository {
    async execute() {
        return db.callProcedure("get_all_active_customers");
    }
}

class GetAllUsersRepository extends IUserRepository {
    async execute() {
        return db.callProcedure("get_all_customers");
    }
}

module.exports = {
    AddUserRepository,
    EditUserRepository,
    DeactivateUserRepository,
    GetActiveUserRepository,
    GetAllActiveUsersRepository,
    GetAllUsersRepository,
};
