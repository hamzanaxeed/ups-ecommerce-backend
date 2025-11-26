// services/authReadService.js
const bcrypt = require("bcrypt");
const { FindActiveUserByEmailAndRoleRepository, FindUserByEmailRepository } = require("../repositories/auth_Operations");
const { validateLogin } = require("../validators/auth_Validator");

class AuthReadService {
  constructor(repos = { findActiveRepo: new FindActiveUserByEmailAndRoleRepository(), findUserRepo: new FindUserByEmailRepository() }) {
    this.findActiveRepo = repos.findActiveRepo;
    this.findUserRepo = repos.findUserRepo;
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
    const user = await this.findActiveRepo.execute({ email, role });
    if (!user) return { error: "User not found or inactive" };

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return { error: "Incorrect password" };

    const { password_hash, ...userInfo } = user;
    return { success: true, user: userInfo };
  }
}

module.exports = AuthReadService;
