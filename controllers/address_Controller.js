const { getAddresses, createAddress, editAddress, deleteAddress, deactivateAddress } = require("../models/address_Model");

// Fetch all addresses for a user
async function fetchAddresses(req, res) {
	try {
		const { userId } = req.params;
		if (!userId) {
			return res.status(400).json({ error: "User ID required" });
		}

		const addresses = await getAddresses(userId);
		return res.json({ addresses });
	} catch (err) {
		console.error("Error fetching addresses:", err.message || err);
		return res.status(400).json({ error: err.message || "Failed to fetch addresses" });
	}
}

// Create a new address
async function createAddressHandler(req, res) {
	try {
		const { user_id, city, country, detail } = req.body;

		if (!user_id || !city || !country || !detail) {
			return res.status(400).json({ error: "user_id, city, country, and detail are required" });
		}

		const address = await createAddress({ user_id, city, country, detail });
		return res.status(201).json({ address });
	} catch (err) {
		console.error("Error creating address:", err.message || err);
		return res.status(400).json({ error: err.message || "Failed to create address" });
	}
}

async function updateAddress(req, res) {
	try {
		const { addressId } = req.params;
		const { city, country, detail } = req.body;

		if (!addressId) {
			return res.status(400).json({ error: "Address ID required" });
		}

		if (!city || !country || !detail) {
			return res.status(400).json({
				error: "city, country and detail are required"
			});
		}

		const updated = await editAddress({ addressId, city, country, detail });
        console.log("REQ.BODY =>", req.body);
console.log("PARAMS =>", req.params);

		return res.json({ updated });

	} catch (err) {
		console.error("Error updating address:", err.message || err);
		return res.status(400).json({ error: err.message || "Failed to update address" });
	}
}


// Delete an address
async function removeAddress(req, res) {
	try {
		const { addressId } = req.params;

		if (!addressId) {
			return res.status(400).json({ error: "Address ID required" });
		}

		const result = await deleteAddress(addressId);
		return res.json({ result });
	} catch (err) {
		console.error("Error deleting address:", err.message || err);
		return res.status(400).json({ error: err.message || "Failed to delete address" });
	}
}

// Deactivate an address
async function deactivateAddressHandler(req, res) {
	try {
		const { addressId } = req.params;

		if (!addressId) {
			return res.status(400).json({ error: "Address ID required" });
		}

		const result = await deactivateAddress(addressId);
		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		return res.json(result);
	} catch (err) {
		console.error("Error deactivating address:", err.message || err);
		return res.status(400).json({ error: err.message || "Failed to deactivate address" });
	}
}

module.exports = { fetchAddresses, createAddressHandler, updateAddress, removeAddress, deactivateAddressHandler };
