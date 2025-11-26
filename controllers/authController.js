// controllers/authController.js
const AuthReadService = require("../services/authReadService");
const AuthWriteService = require("../services/authWriteService");

const readService = new AuthReadService();
const writeService = new AuthWriteService();

async function loginCustomer(req, res) {
  try {
    const result = await readService.loginCustomer(req.body);
    if (result.error) return res.status(400).json(result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function loginTechnician(req, res) {
  try {
    const result = await readService.loginTechnician(req.body);
    if (result.error) return res.status(400).json(result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function loginAdmin(req, res) {
  try {
    const result = await readService.loginAdmin(req.body);
    if (result.error) return res.status(400).json(result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function resetPassword(req, res) {
  try {
    const result = await writeService.resetPassword(req.body);
    if (result.error) return res.status(400).json(result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function changePassword(req, res) {
  try {
    const result = await writeService.changePassword(req.body);
    if (result.error) return res.status(400).json(result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  loginCustomer,
  loginTechnician,
  loginAdmin,
  resetPassword,
  changePassword,
};
