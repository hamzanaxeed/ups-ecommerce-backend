// src/validators/addressValidator.js
class AddressValidator {
    static validateUserId(userId) {
        if (!userId) throw new Error("User ID is required");
    }

    static validateAddressData({ user_id, city, country, detail }) {
        if (!user_id || !city || !country || !detail) {
            throw new Error("All fields are required");
        }
    }

    static validateAddressId(addressId) {
        if (!addressId) throw new Error("Address ID is required");
    }
}

module.exports = AddressValidator;
