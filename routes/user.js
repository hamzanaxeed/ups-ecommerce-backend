const express = require("express");
const router = express.Router();
const {
	registerCustomer,
	updateCustomer,
	deactivateCustomerHandler,
	fetchAllCustomers,
	fetchAllActiveCustomers,
	fetchActiveCustomer,
} = require("../controllers/user_Controller");

// POST /api/customer/register -> create new customer
router.post("/register", registerCustomer);

// GET /api/customer -> get all customers
router.get("/", fetchAllCustomers);

// GET /api/customer/active -> get all active customers
router.get("/active", fetchAllActiveCustomers);

// GET /api/customer/active/:user_Id -> get active customer by ID
router.get("/active/:user_Id", fetchActiveCustomer);

// PUT /api/customer/:user_Id -> update customer
router.put("/:user_Id", updateCustomer);

// DELETE /api/customer/:user_Id -> deactivate customer
router.delete("/:user_Id", deactivateCustomerHandler);

module.exports = router;
