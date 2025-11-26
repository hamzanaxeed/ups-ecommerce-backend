const express = require("express");
const router = express.Router();

const {
    fetchAllPayments,
    fetchPaymentsByOrder,
    createPaymentHandler,
    updatePaymentStatusHandler,
    removePaymentHandler
} = require("../controllers/payment_Controller");

const {
    GetAllPaymentsRepository,
    GetPaymentsByOrderRepository,
    AddPaymentRepository,
    UpdatePaymentStatusRepository,
    DeletePaymentRepository
} = require("../repositories/payment_Operations");

const PaymentValidator = require("../validators/payment_Validator");
const PaymentReadService = require("../services/payment_Read_Service");
const PaymentWriteService = require("../services/payment_Write_Service");

// Repositories
const getAllRepo = new GetAllPaymentsRepository();
const getByOrderRepo = new GetPaymentsByOrderRepository();
const addRepo = new AddPaymentRepository();
const updateStatusRepo = new UpdatePaymentStatusRepository();
const deleteRepo = new DeletePaymentRepository();

// Services
const readService = new PaymentReadService({ getAllRepo, getByOrderRepo }, PaymentValidator);
const writeService = new PaymentWriteService({ addRepo, updateStatusRepo, deleteRepo }, PaymentValidator);

// Routes
router.get("/", (req, res) => fetchAllPayments(req, res, readService));
router.get("/order/:orderId", (req, res) => fetchPaymentsByOrder(req, res, readService));
router.post("/", (req, res) => createPaymentHandler(req, res, writeService));
router.put("/:id/status", (req, res) => updatePaymentStatusHandler(req, res, writeService));
router.delete("/:id", (req, res) => removePaymentHandler(req, res, writeService));

module.exports = router;
