const express = require("express");
const router = express.Router();
const {
	createMeeting,
	deleteMeeting,
	getMeetingsByRoom,
	getAllMeetings,
} = require("../controllers/meetingController");
const { createMeetingValidator } = require("../validators/meetingValidator");

// Route to create a new meeting
router.post("/meetings", createMeetingValidator, createMeeting);

// Route to delete a meeting by ID
router.delete("/meetings/:meetingId", deleteMeeting);

// Route to get meetings by room ID
router.get("/rooms/:roomId/meetings", getMeetingsByRoom);

// Route to get all meetings
router.get("/meetings", getAllMeetings);

module.exports = router;
