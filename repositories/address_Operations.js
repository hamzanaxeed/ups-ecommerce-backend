// src/repositories/addressOperations.js
const db = require("../core/dbClient");
const address_Interface = require("../interfaces/address_Interface");

class AddAddressRepository extends address_Interface {
    async execute({ user_id, city, country, detail }) {
        return db.callProcedure("create_address", {
            p_user_id: user_id,
            p_city: city,
            p_country: country,
            p_detail: detail
        });
    }
}

class EditAddressRepository extends address_Interface {
    async execute(addressId, { city, country, detail }) {
        return db.callProcedure("edit_address", {
            p_address_id: Number(addressId),
            p_city: city,
            p_country: country,
            p_detail: detail
        });
    }
}

class DeleteAddressRepository extends address_Interface {
    async execute(addressId) {
        return db.callProcedure("delete_address", { p_address_id: Number(addressId) });
    }
}

class DeactivateAddressRepository extends address_Interface {
    async execute(addressId) {
        return db.callProcedure("deactivate_address", { p_address_id: Number(addressId) });
    }
}

class GetAddressesRepository extends address_Interface {
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
