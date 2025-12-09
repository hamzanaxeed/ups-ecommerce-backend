// src/core/dbClient.js
const supabase = require("../db/supabaseClient");

class DbClient {
    async callProcedure(name, params) {
        const { data, error } = await supabase.rpc(name, params);
        if (error) throw new Error(error.message);
        // Some Postgres procedures return objects with a `response` key (e.g., { response: [...] }).
        // Normalize and return inner data directly when present to keep a consistent contract.
        return data && data.response ? data.response : data;
    }
}

// Create or reuse a singleton DbClient instance on the global object so the same instance
// is returned across the project and in different module reload scenarios (tests/dev).
const GLOBAL_KEY = "__DB_CLIENT_INSTANCE__";
if (!global[GLOBAL_KEY]) {
    global[GLOBAL_KEY] = new DbClient();
}

const dbClientInstance = global[GLOBAL_KEY];
module.exports = dbClientInstance;
module.exports.getInstance = () => dbClientInstance;
module.exports.__isSingleton = true;