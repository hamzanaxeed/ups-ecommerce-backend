// services/authWriteService.js
const bcrypt = require("bcrypt");
const AuthRepository = require("../repositories/authRepository");
const { validateResetPassword, validateChangePassword } = require("../validators/authValidator");

class AuthWriteService {
  constructor() {
    this.authRepo = new AuthRepository();
  }

  async resetPassword(body) {
    validateResetPassword(body);
    const { email, new_password } = body;

    const hash = await bcrypt.hash(new_password, 10);
    const result = await this.authRepo.updatePasswordByEmail(email, hash);
    if (!result) return { error: "User not found or inactive" };

    return { success: true, message: "Password reset successfully" };
  }

  async changePassword(body) {
    validateChangePassword(body);
    const { email, oldPassword, newPassword } = body;

    const user = await this.authRepo.findUserByEmail(email);
    if (!user) return { error: "User not found" };

    const match = await bcrypt.compare(oldPassword, user.password_hash);
    if (!match) return { error: "Old password is incorrect" };

    const hash = await bcrypt.hash(newPassword, 10);
    const updated = await this.authRepo.updateUserPassword(email, hash);
    if (!updated) return { error: "Failed to update password" };

    return { success: true, message: "Password changed successfully" };
  }
}

module.exports = AuthWriteService;
