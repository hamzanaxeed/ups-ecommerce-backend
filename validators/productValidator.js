class ProductValidator {
    static validateCreate(payload) {
        const { name, price } = payload;
        if (!name || price === undefined) {
            throw new Error("Name and price are required");
        }
    }

    static validateUpdate(payload) {
        const { name, price } = payload;
        if (!name || price === undefined) {
            throw new Error("Name and price are required");
        }
    }
}

module.exports = ProductValidator;
