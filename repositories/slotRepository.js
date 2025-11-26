// src/repositories/slotRepository.js
const supabase = require("../db/supabaseClient");
const ISlotRepository = require("../interfaces/ISlotRepository");

// CREATE
class CreateSlotRepository extends ISlotRepository {
    async execute(payload) {
        return supabase.rpc("add_slot", {
            p_slot_time: payload.slot_time,
        });
    }
}

// UPDATE
class UpdateSlotRepository extends ISlotRepository {
    async execute(payload) {
        return supabase.rpc("update_slot", {
            p_slot_id: payload.slot_id,
            p_slot_time: payload.slot_time,
        });
    }
}

// DELETE
class DeleteSlotRepository extends ISlotRepository {
    async execute(slot_id) {
        return supabase.rpc("delete_slot", { p_slot_id: slot_id });
    }
}

// GET ALL
class GetAllSlotsRepository extends ISlotRepository {
    async execute() {
        return supabase.from("slots").select("*");
    }
}

module.exports = {
    CreateSlotRepository,
    UpdateSlotRepository,
    DeleteSlotRepository,
    GetAllSlotsRepository
};
