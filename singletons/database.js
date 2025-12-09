const supabase = require("../db/supabaseClient");
const dbClient = require("../core/dbClient");

/**
 * Aggregator module that exposes DB singletons in one place.
 * Use `const { supabase, dbClient } = require('./singletons/database')`
 * or the getters `getSupabase()` / `getDbClient()`.
 */
module.exports = {
    supabase,
    dbClient,
    getSupabase: () => (typeof supabase.getInstance === 'function' ? supabase.getInstance() : supabase),
    getDbClient: () => (typeof dbClient.getInstance === 'function' ? dbClient.getInstance() : dbClient),
};
