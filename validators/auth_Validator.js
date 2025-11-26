// validators/authValidator.js
function validateLogin(body) {
  const { email, password } = body;
  if (!email || !password) throw new Error("Email and password are required");
}

function validateResetPassword(body) {
  const { email, new_password } = body;
  if (!email || !new_password) throw new Error("Email and new password are required");
}

function validateChangePassword(body) {
  const { email, oldPassword, newPassword } = body;
  if (!email || !oldPassword || !newPassword)
    throw new Error("Email, old password, and new password are required");
}

module.exports = { validateLogin, validateResetPassword, validateChangePassword };
