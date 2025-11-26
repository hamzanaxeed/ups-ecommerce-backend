const supabase = require("../db/supabaseClient"); // your initialized supabase client

/**
 * Verify if a user exists by user_Id
 * @param {string} userId - UUID of the user
 * @returns {Promise<boolean>} - true if user exists and is active
 */
async function verifyUserId(userId) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('user_Id')
            .eq('user_Id', userId)
            .eq('is_active', true)
            .limit(1);

        if (error) {
            console.error('Error verifying user:', error);
            return false;
        }

        return data && data.length > 0;
    } catch (err) {
        console.error('Unexpected error:', err);
        return false;
    }
}

module.exports = verifyUserId;
