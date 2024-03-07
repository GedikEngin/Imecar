// meetingController.js

const {
	Meeting,
	Room,
	User,
	connect,
	sequelize,
} = require("../configs/dbConfig");
const { Op } = require("sequelize");

exports.meetingController = {
	async createMeeting(req, res) {
		await connect();
		try {
			const { userID, roomID, meetingDate, meetingStart, meetingEnd } =
				req.body;

			// Check if the user has permission to create a meeting in the specified room

			const room = await Room.findByPk(roomID);
			const user = await User.findByPk(userID);

			if (!room || user.permission > room.minPermission) {
				return res.status(403).json({
					message: "Insufficient clearance to create a meeting in this room",
				});
			}

			// this is where you would try to get userID from the encrypted cookie and attempt to decrypt it to create a meeting
			// currently pass userID into it manually

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
	},

	async getAllMeetings(req, res) {
		await connect();
		try {
			const meetings = await Meeting.findAll();
			res.json(meetings);
		} catch (error) {
			console.error("Error retrieving meetings:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},

	async getMeetingsByRoomDate(req, res) {
		await connect();
		try {
			const { roomID, meetingDate } = req.params;

			// Find the room by ID
			const room = await Room.findByPk(roomID);
			if (!room) {
				return res.status(404).json({ message: "Room not found" });
			}

			const meetings = await Meeting.findAll({
				where: { roomID, meetingDate },
			});
			res.json(meetings);
		} catch (error) {
			console.error("Error retrieving meetings:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},

	async getMeetingsByRoomDateLed(roomID, meetingDate) {
		await connect();
		try {
			// Find the room by ID
			const room = await Room.findByPk(roomID);
			if (!room) {
				throw new Error("Room not found");
			}

			const meetings = await Meeting.findAll({
				where: { roomID, meetingDate },
			});
			return meetings;
		} catch (error) {
			console.error("Error retrieving meetings:", error);
			throw error;
		}
	},

	async getAllMeetingsBetween(req, res) {
		await connect();
		try {
			const { queryDateStart, queryDateEnd, roomID } = req.params;

			// Find all meetings between the specified dates
			const meetings = await Meeting.findAll({
				where: {
					meetingDate: {
						[Op.between]: [queryDateStart, queryDateEnd],
					},
					roomID: roomID,
				},
			});

			res.status(200).json(meetings);
		} catch (error) {
			console.error("Error retrieving meetings between dates:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},

	async deleteMeetingByID(req, res) {
		await connect();
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
	},

	async deleteMeetingByInfo(req, res) {
		await connect();
		try {
			const { roomID, meetingDate, meetingStart } = req.params;

			// Find the meeting by ID
			const meeting = await Meeting.findOne({
				where: { roomID, meetingDate, meetingStart },
			});
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
	},
};
