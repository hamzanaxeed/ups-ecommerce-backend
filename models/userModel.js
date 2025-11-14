const supabase = require("../db/supabaseClient");

async function findByIdentifier(identifier) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .or(`email.eq."${identifier}",username.eq."${identifier}"`)
    .limit(1)
    .single();

  if (error) return null;
  return data;
}

async function createUser({ email, username, password_hash }) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ email, username, password_hash }])
    .select()
    .single();

  if (error) throw error;

  return data;
}

async function setRefreshToken(userId, token) {
  const { error } = await supabase
    .from("users")
    .update({ refresh_token: token })
    .eq("id", userId);

  if (error) {
    console.error("Error saving refresh token", error);
  }
}

async function getUserById(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) return null;
  return data;
}

module.exports = { findByIdentifier, createUser, setRefreshToken, getUserById };
