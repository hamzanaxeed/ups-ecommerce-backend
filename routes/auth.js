const express = require("express");
const router = express.Router();
const { loginCustomer, loginTechnician, loginAdmin, resetPassword } = require("../controllers/authController");

// POST /api/auth/login/customer
router.post("/login/customer", loginCustomer);

// POST /api/auth/login/technician
router.post("/login/technician", loginTechnician);

// POST /api/auth/login/admin
router.post("/login/admin", loginAdmin);

// POST /api/auth/reset-password
router.post("/reset-password", resetPassword);

module.exports = router;
