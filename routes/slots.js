// src/routes/slotRoutes.js
const express = require("express");
const router = express.Router();

const {
    fetchSlots,
    createSlot,
    modifySlot,
    removeSlot
} = require("../controllers/slotController");

const {
    CreateSlotRepository,
    UpdateSlotRepository,
    DeleteSlotRepository,
    GetAllSlotsRepository
} = require("../repositories/slotRepository");

const SlotReadService = require("../services/slotReadService");
const SlotWriteService = require("../services/slotWriteService");

// Initialize Repositories
const createRepo = new CreateSlotRepository();
const updateRepo = new UpdateSlotRepository();
const deleteRepo = new DeleteSlotRepository();
const allRepo = new GetAllSlotsRepository();

// Initialize Services
const readService = new SlotReadService({ allRepo });
const writeService = new SlotWriteService({ createRepo, updateRepo, deleteRepo });

// Routes
router.get("/", (req, res) => fetchSlots(req, res, readService));
router.post("/", (req, res) => createSlot(req, res, writeService));
router.put("/:id", (req, res) => modifySlot(req, res, writeService));
router.delete("/:id", (req, res) => removeSlot(req, res, writeService));

module.exports = router;