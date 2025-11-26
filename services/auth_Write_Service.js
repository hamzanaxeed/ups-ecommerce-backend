// services/authWriteService.js
const bcrypt = require("bcrypt");
const { UpdatePasswordByEmailRepository, FindUserByEmailRepository, UpdateUserPasswordRepository } = require("../repositories/auth_Operations");
const { validateResetPassword, validateChangePassword } = require("../validators/auth_Validator");

class AuthWriteService {
  constructor(repos = { updatePasswordByEmailRepo: new UpdatePasswordByEmailRepository(), findUserRepo: new FindUserByEmailRepository(), updateUserPasswordRepo: new UpdateUserPasswordRepository() }) {
    this.updatePasswordByEmailRepo = repos.updatePasswordByEmailRepo;
    this.findUserRepo = repos.findUserRepo;
    this.updateUserPasswordRepo = repos.updateUserPasswordRepo;
  }

  async resetPassword(body) {
    validateResetPassword(body);
    const { email, new_password } = body;

    const hash = await bcrypt.hash(new_password, 10);
    const result = await this.updatePasswordByEmailRepo.execute({ email, password_hash: hash });
    if (!result) return { error: "User not found or inactive" };

    return { success: true, message: "Password reset successfully" };
  }

  async changePassword(body) {
    validateChangePassword(body);
    const { email, oldPassword, newPassword } = body;

    const user = await this.findUserRepo.execute({ email });
    if (!user) return { error: "User not found" };

    const match = await bcrypt.compare(oldPassword, user.password_hash);
    if (!match) return { error: "Old password is incorrect" };

    const hash = await bcrypt.hash(newPassword, 10);
    const updated = await this.updateUserPasswordRepo.execute({ email, password_hash: hash });
    if (!updated) return { error: "Failed to update password" };

    return { success: true, message: "Password changed successfully" };
  }
}

module.exports = AuthWriteService;
