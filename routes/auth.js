// routes/auth.js
const express = require("express");
const router = express.Router();
const {
  loginCustomer,
  loginTechnician,
  loginAdmin,
  resetPassword,
  changePassword,
} = require("../controllers/auth_Controller");

const { FindActiveUserByEmailAndRoleRepository, FindUserByEmailRepository, UpdatePasswordByEmailRepository, UpdateUserPasswordRepository } = require("../repositories/auth_Operations");
const AuthReadService = require("../services/auth_Read_Service");
const AuthWriteService = require("../services/auth_Write_Service");

const findActiveRepo = new FindActiveUserByEmailAndRoleRepository();
const findUserRepo = new FindUserByEmailRepository();
const updatePasswordByEmailRepo = new UpdatePasswordByEmailRepository();
const updateUserPasswordRepo = new UpdateUserPasswordRepository();

const readService = new AuthReadService({ findActiveRepo, findUserRepo });
const writeService = new AuthWriteService({ updatePasswordByEmailRepo, findUserRepo, updateUserPasswordRepo });

router.post("/login/customer", (req, res) => loginCustomer(req, res, readService));
router.post("/login/technician", (req, res) => loginTechnician(req, res, readService));
router.post("/login/admin", (req, res) => loginAdmin(req, res, readService));
router.post("/reset-password", (req, res) => resetPassword(req, res, writeService));
router.post("/change-password", (req, res) => changePassword(req, res, writeService));

module.exports = router;
