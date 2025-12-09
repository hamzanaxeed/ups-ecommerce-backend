require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

// Ensure a single Supabase client instance across the app/runtime.
// Using global to make the singleton resilient to module reloads in some test/dev setups.
const GLOBAL_KEY = "__SUPABASE_CLIENT_INSTANCE__";

if (!global[GLOBAL_KEY]) {
  const instance = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  console.log("Supabase URL:", process.env.SUPABASE_URL);
  console.log("Supabase Key:", process.env.SUPABASE_KEY ? "****" : "Not Set");
  console.log("Supabase client initialized");

  global[GLOBAL_KEY] = instance;
}

const supabase = global[GLOBAL_KEY];

// Keep the previous default export (the client) and also expose a getter for clarity.
module.exports = supabase;
module.exports.getInstance = () => supabase;
module.exports.__isSingleton = true;
