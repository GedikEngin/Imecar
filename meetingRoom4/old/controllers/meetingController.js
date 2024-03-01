// meetingController.js

const { Meeting } = require("../models/meetingModel");
const { Room } = require("../models/roomModel");

exports.createMeeting = async (req, res) => {
	try {
		const { userID, roomID, meetingDate, meetingStart, meetingEnd } = req.body;

		// Check if the user has permission to create a meeting in the specified room
		const room = await Room.findByPk(roomID);
		if (!room || req.user.clearance < room.minPermission) {
			return res.status(403).json({
				message: "Insufficient clearance to create a meeting in this room",
			});
		}

		// Create the meeting
		const meeting = await Meeting.create({
			userID,
			roomID,
			meetingDate,
			meetingStart,
			meetingEnd,
		});

		res.status(201).json(meeting);
	} catch (error) {
		console.error("Error creating meeting:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.getMeetingsByRoom = async (req, res) => {
	try {
		const { roomID } = req.params;
		const { clearance } = req.user; // Assuming user clearance level is available in the request

		// Find the room by ID
		const room = await Room.findByPk(roomID);
		if (!room) {
			return res.status(404).json({ message: "Room not found" });
		}

		// Check if the user's clearance level allows them to access the room
		if (clearance >= room.minPermission) {
			// Retrieve meetings for the room
			const meetings = await Meeting.findAll({ where: { roomID } });
			res.json(meetings);
		} else {
			res
				.status(403)
				.json({ message: "Insufficient clearance to access the room" });
		}
	} catch (error) {
		console.error("Error retrieving meetings:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.getAllMeetings = async (req, res) => {
	try {
		const meetings = await Meeting.findAll();
		res.json(meetings);
	} catch (error) {
		console.error("Error retrieving meetings:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.deleteMeeting = async (req, res) => {
	try {
		const { meetingID } = req.params;

		// Find the meeting by ID
		const meeting = await Meeting.findByPk(meetingID);
		if (!meeting) {
			return res.status(404).json({ message: "Meeting not found" });
		}

		// Check if the user has permission to delete the meeting (assuming permission checks)
		// Additional permission logic can be added here

		// Delete the meeting
		await meeting.destroy();

		res.json({ message: "Meeting deleted successfully" });
	} catch (error) {
		console.error("Error deleting meeting:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
