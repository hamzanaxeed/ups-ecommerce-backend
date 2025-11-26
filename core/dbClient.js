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

module.exports = new DbClient();