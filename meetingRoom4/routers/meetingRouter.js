const express = require("express");
const router = express.Router();
const { meetingController } = require("../controllers/meetingController");
const { createMeetingValidator } = require("../validators/meetingValidator");

// Route to create a new meeting
router.post("/create", createMeetingValidator, meetingController.createMeeting);

// Route to get all meetings
router.get("/meetings", meetingController.getAllMeetings);

// Route to get meetings by room ID
router.get(
	"/search/:roomID/:meetingDate",
	meetingController.getMeetingsByRoomDate
);

// Route to delete a meeting by ID
router.delete(
	"/delete/meetingID/:meetingID",
	meetingController.deleteMeetingByID
);
router.delete(
	"/delete/byInfo/:roomID/:meetingDate/:meetingStart",
	meetingController.deleteMeetingByInfo
);

module.exports = router;
