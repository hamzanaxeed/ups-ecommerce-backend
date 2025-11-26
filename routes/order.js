const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order_Controller");
const {
	GetAllOrdersRepository,
	GetOrderByIdRepository,
	GetOrderFullDetailRepository,
	CreateFullOrderRepository,
	GetOrdersByCustomerRepository,
	UpdateOrderStatusRepository,
	DeleteOrderRepository,
	GetOrderSummaryRepository,
	CompleteOrderRepository,
	ConfirmOrderRepository,
} = require("../repositories/order_Operations");
const OrderService = require("../services/order_Service");

const getAllRepo = new GetAllOrdersRepository();
const getByIdRepo = new GetOrderByIdRepository();
const fullDetailRepo = new GetOrderFullDetailRepository();
const createRepo = new CreateFullOrderRepository();
const byCustomerRepo = new GetOrdersByCustomerRepository();
const updateRepo = new UpdateOrderStatusRepository();
const deleteRepo = new DeleteOrderRepository();
const summaryRepo = new GetOrderSummaryRepository();
const completeRepo = new CompleteOrderRepository();
const confirmRepo = new ConfirmOrderRepository();

const orderService = new OrderService({ getAllRepo, getByIdRepo, fullDetailRepo, createRepo, getByCustomerRepo: byCustomerRepo, updateStatusRepo: updateRepo, deleteRepo, summaryRepo, completeRepo, confirmRepo });

router.get("/", (req, res) => orderController.fetchAllOrders(req, res, orderService));
router.get("/summary", (req, res) => orderController.fetchOrderSummary(req, res, orderService));
router.post("/", (req, res) => orderController.createOrder(req, res, orderService));
router.get("/customer/:customerId", (req, res) => orderController.fetchCustomerOrders(req, res, orderService));
router.get("/:id", (req, res) => orderController.fetchOrderById(req, res, orderService));
router.get("/:id/detail", (req, res) => orderController.fetchFullOrderDetail(req, res, orderService));
router.put("/:id/status", (req, res) => orderController.updateStatus(req, res, orderService));
router.put("/:id/complete", (req, res) => orderController.completeOrder(req, res, orderService));
router.put("/:id/confirm", (req, res) => orderController.confirmOrder(req, res, orderService));
router.delete("/:id", (req, res) => orderController.removeOrder(req, res, orderService));

module.exports = router;
