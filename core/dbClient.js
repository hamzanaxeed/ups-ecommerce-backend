// src/core/dbClient.js
const supabase = require("../db/supabaseClient");


class DbClient {
    async callProcedure(name, params) {
        const { data, error } = await supabase.rpc(name, params);
        if (error) throw new Error(error.message);
        return data;
    }
}

module.exports = new DbClient();