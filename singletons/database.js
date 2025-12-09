const supabase = require("../db/supabaseClient");
const dbClient = require("../core/dbClient");

module.exports = {
    supabase,
    dbClient,
    getSupabase: () => (typeof supabase.getInstance === 'function' ? supabase.getInstance() : supabase),
    getDbClient: () => (typeof dbClient.getInstance === 'function' ? dbClient.getInstance() : dbClient),
};
