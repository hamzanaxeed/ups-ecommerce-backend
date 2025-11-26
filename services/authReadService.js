// services/authReadService.js
const bcrypt = require("bcrypt");
const AuthRepository = require("../repositories/authRepository");
const { validateLogin } = require("../validators/authValidator");

class AuthReadService {
  constructor() {
    this.authRepo = new AuthRepository();
  }

  async loginCustomer(body) {
    validateLogin(body);
    return this.loginByRole(body, "customer");
  }

  async loginTechnician(body) {
    validateLogin(body);
    return this.loginByRole(body, "technician");
  }

  async loginAdmin(body) {
    validateLogin(body);
    return this.loginByRole(body, "admin");
  }

  async loginByRole(body, role) {
    const { email, password } = body;
    const user = await this.authRepo.findActiveUserByEmailAndRole(email, role);
    if (!user) return { error: "User not found or inactive" };

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return { error: "Incorrect password" };

    const { password_hash, ...userInfo } = user;
    return { success: true, user: userInfo };
  }
}

module.exports = AuthReadService;
