const bcrypt = require("bcrypt");
const { findActiveUserByEmailAndRole, updatePasswordByEmail } = require("../models/auth_Model");

// Generic login helper
async function loginByRole(email, password, role) {
  try {
    const user = await findActiveUserByEmailAndRole(email, role);

    if (!user) return { error: "User not found or inactive" };

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return { error: "Incorrect password" };

    const { password_hash, ...userInfo } = user;
    return { success: true, user: userInfo };
  } catch (err) {
    console.error("Login error:", err.message || err);
    return { error: "Login failed" };
  }
}

// Login handlers
async function loginCustomer(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  const result = await loginByRole(email, password, "customer");
  if (result.error) return res.status(400).json({ error: result.error });

  return res.json(result);
}

async function loginTechnician(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  const result = await loginByRole(email, password, "technician");
  if (result.error) return res.status(400).json({ error: result.error });

  return res.json(result);
}

async function loginAdmin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  const result = await loginByRole(email, password, "admin");
  if (result.error) return res.status(400).json({ error: result.error });

  return res.json(result);
}

// Reset password handler
async function resetPassword(req, res) {
  try {
    const { email, new_password } = req.body;
    if (!email || !new_password) return res.status(400).json({ error: "Email and new password required" });

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(new_password, saltRounds);

    const data = await updatePasswordByEmail(email, password_hash);
    if (!data) return res.status(404).json({ error: "User not found or inactive" });

    return res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err.message || err);
    return res.status(500).json({ error: "Failed to reset password" });
  }
}

module.exports = { loginCustomer, loginTechnician, loginAdmin, resetPassword };
