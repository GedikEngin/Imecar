// roomController.js

const { Room } = require("../models/roomModel");

exports.createRoom = async (req, res) => {
	try {
		// Extract room data from request body
		const { roomName, minPermission, department } = req.body;

		// Create a new room record in the database
		const newRoom = await Room.create({ roomName, minPermission, department });

		res.status(201).json(newRoom);
	} catch (error) {
		console.error("Error creating room:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.deleteRoom = async (req, res) => {
	try {
		// Extract room ID from request parameters
		const { roomId } = req.params;

		// Find the room by ID and delete it
		const deletedRoom = await Room.destroy({ where: { id: roomId } });

		if (!deletedRoom) {
			return res.status(404).json({ message: "Room not found" });
		}

		res.json({ message: "Room deleted successfully" });
	} catch (error) {
		console.error("Error deleting room:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
