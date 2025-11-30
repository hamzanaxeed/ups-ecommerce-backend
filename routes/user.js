const express = require("express");
const router = express.Router();
const {
	registerCustomer,
	updateCustomer,
	deactivateCustomerHandler,
	activateCustomerHandler,
	fetchAllCustomers,
	fetchAllActiveCustomers,
	fetchActiveCustomer,
} = require("../controllers/user_Controller");

const {
	AddUserRepository,
	EditUserRepository,
	DeactivateUserRepository,
	ActivateUserRepository,
	GetActiveUserRepository,
	GetAllActiveUsersRepository,
	GetAllUsersRepository,
} = require("../repositories/user_Operations");

const UserReadService = require("../services/user_Read_Service");
const UserWriteService = require("../services/user_Write_Service");
const UserValidator = require("../validators/userValidator");

// Repositories
const addRepo = new AddUserRepository();
const editRepo = new EditUserRepository();
const deactivateRepo = new DeactivateUserRepository();
const activateRepo = new ActivateUserRepository();
const getActiveRepo = new GetActiveUserRepository();
const getAllActiveRepo = new GetAllActiveUsersRepository();
const getAllRepo = new GetAllUsersRepository();

// Services
const readService = new UserReadService(getActiveRepo, getAllRepo, getAllActiveRepo, UserValidator);
const writeService = new UserWriteService({ addRepo, editRepo, deactivateRepo, activateRepo }, UserValidator);

// POST /api/customer/register -> create new customer
router.post("/register", (req, res) => registerCustomer(req, res, writeService));

// GET /api/customer -> get all customers
router.get("/", (req, res) => fetchAllCustomers(req, res, readService));

// GET /api/customer/active -> get all active customers
router.get("/active", (req, res) => fetchAllActiveCustomers(req, res, readService));

// GET /api/customer/active/:user_Id -> get active customer by ID
router.get("/active/:user_Id", (req, res) => fetchActiveCustomer(req, res, readService));

// PUT /api/customer/:user_Id -> update customer
router.put("/:user_Id", (req, res) => updateCustomer(req, res, writeService));

// DELETE /api/customer/:user_Id -> deactivate customer
router.delete("/:user_Id", (req, res) => deactivateCustomerHandler(req, res, writeService));

// POST /api/customer/activate/:user_Id -> activate customer
router.post("/activate/:user_Id", (req, res) => activateCustomerHandler(req, res, writeService));

module.exports = router;
