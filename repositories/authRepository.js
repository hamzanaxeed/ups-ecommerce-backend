// repositories/authRepository.js
const IAuthRepository = require("../interfaces/IAuthRepository");
const supabase = require("../db/supabaseClient");

class AuthRepository extends IAuthRepository {
  async findActiveUserByEmailAndRole(email, role) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("role", role)
      .eq("is_active", true)
      .limit(1)
      .single();
    if (error) throw error;
    return data;
  }

  async findUserByEmail(email) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
    if (error) throw error;
    return data;
  }

  async updatePasswordByEmail(email, password_hash) {
    const { data, error } = await supabase
      .from("users")
      .update({ password_hash })
      .eq("email", email)
      .eq("is_active", true)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateUserPassword(email, password_hash) {
    const { data, error } = await supabase
      .from("users")
      .update({ password_hash })
      .eq("email", email)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

module.exports = AuthRepository;
