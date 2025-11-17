const express = require("express");
const router = express.Router();
const { fetchSlots, createSlot, modifySlot, removeSlot } = require("../controllers/slots_Controller");

// GET /api/slots -> list slots
router.get("/", fetchSlots);

// POST /api/slots -> create slot
router.post("/", createSlot);

// PUT /api/slots/:id -> update slot
router.put("/:id", modifySlot);

// DELETE /api/slots/:id -> delete slot
router.delete("/:id", removeSlot);

module.exports = router;

