// routes/auth.js
const express = require("express");
const router = express.Router();
const {
  loginCustomer,
  loginTechnician,
  loginAdmin,
  resetPassword,
  changePassword,
} = require("../controllers/authController");

router.post("/login/customer", loginCustomer);
router.post("/login/technician", loginTechnician);
router.post("/login/admin", loginAdmin);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);

module.exports = router;
