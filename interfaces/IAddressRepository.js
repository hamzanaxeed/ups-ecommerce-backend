// src/interfaces/IAddressRepository.js
class IAddressRepository {
    async getAddresses(userId) {
        throw new Error("Method 'getAddresses' must be implemented");
    }

    async createAddress({ user_id, city, country, detail }) {
        throw new Error("Method 'createAddress' must be implemented");
    }

    async updateAddress({ addressId, city, country, detail }) {
        throw new Error("Method 'updateAddress' must be implemented");
    }

    async deleteAddress(addressId) {
        throw new Error("Method 'deleteAddress' must be implemented");
    }

    async deactivateAddress(addressId) {
        throw new Error("Method 'deactivateAddress' must be implemented");
    }
}

module.exports = IAddressRepository;
