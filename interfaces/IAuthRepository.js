// interfaces/IAuthRepository.js
class IAuthRepository {
  async findActiveUserByEmailAndRole(email, role) {
    throw new Error("Method not implemented");
  }

  async findUserByEmail(email) {
    throw new Error("Method not implemented");
  }

  async updatePasswordByEmail(email, password_hash) {
    throw new Error("Method not implemented");
  }

  async updateUserPassword(email, password_hash) {
    throw new Error("Method not implemented");
  }
}

module.exports = IAuthRepository;
