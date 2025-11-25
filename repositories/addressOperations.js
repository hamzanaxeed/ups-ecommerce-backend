// src/repositories/addressOperations.js
const db = require("../core/dbClient");
const IAddressRepository = require("../interfaces/IAddressRepository");

class AddAddressRepository extends IAddressRepository {
    async execute({ user_id, city, country, detail }) {
        return db.callProcedure("create_address", {
            p_user_id: user_id,
            p_city: city,
            p_country: country,
            p_detail: detail
        });
    }
}

class EditAddressRepository extends IAddressRepository {
    async execute(addressId, { city, country, detail }) {
        return db.callProcedure("edit_address", {
            p_address_id: Number(addressId),
            p_city: city,
            p_country: country,
            p_detail: detail
        });
    }
}

class DeleteAddressRepository extends IAddressRepository {
    async execute(addressId) {
        return db.callProcedure("delete_address", { p_address_id: Number(addressId) });
    }
}

class DeactivateAddressRepository extends IAddressRepository {
    async execute(addressId) {
        return db.callProcedure("deactivate_address", { p_address_id: Number(addressId) });
    }
}

class GetAddressesRepository extends IAddressRepository {
    async execute(userId) {
        return db.callProcedure("get_addresses", { p_user_id: userId });
    }
}

module.exports = {
    AddAddressRepository,
    EditAddressRepository,
    DeleteAddressRepository,
    DeactivateAddressRepository,
    GetAddressesRepository
};
