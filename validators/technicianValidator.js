class TechnicianValidator {
    static validateUserId(userId) {
        if (!userId) throw new Error("User ID is required");
    }

    static validateTechnicianData({ name, email, username, password, phone_Number } = {}, options = { allowPassword: false }) {
        if (!name || !email || !username || !phone_Number) {
            throw new Error("name, email, username and phone_Number are required");
        }
        if (!options.allowPassword && !password) {
            throw new Error("Password is required");
        }
    }

    static validateTechnicianId(userId) {
        if (!userId) throw new Error("User ID is required");
    }
}

module.exports = TechnicianValidator;
