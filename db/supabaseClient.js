// backend/db/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Use service role key if you have one (for full DB access)
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
