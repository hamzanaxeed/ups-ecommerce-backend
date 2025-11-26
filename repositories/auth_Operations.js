const supabase = require("../db/supabaseClient");
const IAuthRepository = require("../interfaces/auth_Interface");

class FindActiveUserByEmailAndRoleRepository extends IAuthRepository {
  async execute({ email, role }) {
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
}

class FindUserByEmailRepository extends IAuthRepository {
  async execute({ email }) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
    if (error) throw error;
    return data;
  }
}

class UpdatePasswordByEmailRepository extends IAuthRepository {
  async execute({ email, password_hash }) {
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
}

class UpdateUserPasswordRepository extends IAuthRepository {
  async execute({ email, password_hash }) {
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

module.exports = {
  FindActiveUserByEmailAndRoleRepository,
  FindUserByEmailRepository,
  UpdatePasswordByEmailRepository,
  UpdateUserPasswordRepository,
};
