const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");
const { createMeetingValidator } = require("../validators/meetingValidator");

// Route to create a new meeting
router.post(
	"/meetings",
	createMeetingValidator,
	meetingController.createMeeting
);

// Route to get all meetings
router.get("/meetings", meetingController.getAllMeetings);

// Route to get meetings by room ID
router.get("/rooms/:roomID/meetings", meetingController.getMeetingsByRoom);

// Route to delete a meeting by ID
router.delete("/meetings/:meetingID", meetingController.deleteMeeting);

module.exports = router;
