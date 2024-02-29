const { Room } = require("../models/roomModel");

// Controller functions for room operations
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

// Function to get all rooms
exports.getAllRooms = async (req, res) => {
	try {
		// Retrieve all rooms from the database
		const rooms = await Room.findAll();
		res.json(rooms);
	} catch (error) {
		console.error("Error retrieving rooms:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// Controller function to get a room by ID
exports.getRoomByID = async (req, res) => {
	try {
		const { roomID } = req.params;
		const room = await Room.findByPk(roomID);
		if (!room) {
			return res.status(404).json({ message: "Room not found" });
		}
		res.json(room);
	} catch (error) {
		console.error("Error retrieving room:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// Controller function to get a room by name
exports.getRoomByName = async (req, res) => {
	try {
		const { roomName } = req.params;
		const room = await Room.findOne({ where: { roomName } });
		if (!room) {
			return res.status(404).json({ message: "Room not found" });
		}
		res.json(room);
	} catch (error) {
		console.error("Error retrieving room:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.deleteRoomByID = async (req, res) => {
	try {
		// Extract room ID from request parameters
		const { roomID } = req.params;

		// Find the room by ID and delete it
		const deletedRoom = await Room.destroy({ where: { id: roomID } });

		if (!deletedRoom) {
			return res.status(404).json({ message: "Room not found" });
		}

		res.json({ message: "Room deleted successfully" });
	} catch (error) {
		console.error("Error deleting room:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.deleteRoomByName = async (req, res) => {
	try {
		// Extract room name from request parameters
		const { roomName } = req.params;

		// Find the room by name and delete it
		const deletedRoom = await Room.destroy({ where: { roomName } });

		if (!deletedRoom) {
			return res.status(404).json({ message: "Room not found" });
		}

		res.json({ message: "Room deleted successfully" });
	} catch (error) {
		console.error("Error deleting room:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
