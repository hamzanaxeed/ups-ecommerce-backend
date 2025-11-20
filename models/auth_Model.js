const supabase = require("../db/supabaseClient");

async function findActiveUserByEmailAndRole(email, role) {
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

async function updatePasswordByEmail(email, password_hash) {
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

module.exports = { findActiveUserByEmailAndRole, updatePasswordByEmail };
