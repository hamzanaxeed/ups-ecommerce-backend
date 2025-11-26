// controllers/authController.js
const AuthReadService = require("../services/authReadService");
const AuthWriteService = require("../services/authWriteService");

const readService = new AuthReadService();
const writeService = new AuthWriteService();

async function loginCustomer(req, res) {
  const result = await readService.loginCustomer(req.body);
  if (result.error) return res.status(400).json(result);
  res.json(result);
}

async function loginTechnician(req, res) {
  const result = await readService.loginTechnician(req.body);
  if (result.error) return res.status(400).json(result);
  res.json(result);
}

async function loginAdmin(req, res) {
  const result = await readService.loginAdmin(req.body);
  if (result.error) return res.status(400).json(result);
  res.json(result);
}

async function resetPassword(req, res) {
  const result = await writeService.resetPassword(req.body);
  if (result.error) return res.status(400).json(result);
  res.json(result);
}

async function changePassword(req, res) {
  const result = await writeService.changePassword(req.body);
  if (result.error) return res.status(400).json(result);
  res.json(result);
}

module.exports = {
  loginCustomer,
  loginTechnician,
  loginAdmin,
  resetPassword,
  changePassword,
};
