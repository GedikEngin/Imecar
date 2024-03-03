// meetingRouter.js

const express = require("express");
const router = express.Router();
const { meetingController } = require("../controllers/meetingController");
const { cookies } = require("../middlewares/auth/auth"); // Import the cookies object from auth.js
const { createMeetingValidator } = require("../validators/meetingValidator");

// Route for creating a meeting
router.post(
	"/create",
	cookies.verifyAndAttachUser,
	createMeetingValidator,
	meetingController.createMeeting
);

// Route to get all meetings
router.get(
	"/meetings",
	cookies.verifyAndAttachUser,
	meetingController.getAllMeetings
);

// Route to get all meetings between two dates
router.get(
	"/search/between/:queryDateStart/:queryDateEnd/:roomID",
	cookies.verifyAndAttachUser,
	meetingController.getAllMeetingsBetween
);

// Route to get meetings by room ID
router.get(
	"/search/:roomID/:meetingDate",
	cookies.verifyAndAttachUser,
	meetingController.getMeetingsByRoomDate
);

// Route to delete a meeting by ID
router.delete(
	"/delete/meetingID/:meetingID",
	cookies.verifyAndAttachUser,
	meetingController.deleteMeetingByID
);

// Route to delete a meeting by info
router.delete(
	"/delete/byInfo/:roomID/:meetingDate/:meetingStart",
	cookies.verifyAndAttachUser,
	meetingController.deleteMeetingByInfo
);

module.exports = router;

// DELETE Meeting by ID Example Cycle:
// - Client sends a DELETE request to the server with the meeting ID included in the URL parameter.
// - Express routes the request to the appropriate route handler in meetingRouter.js.
// - The request passes through the auth, which verifies the access token stored in the client's cookies.
// - If the access token is valid, the middleware attaches the decoded user information to the request object.
// - The route handler executes the deleteMeetingByID controller function, which attempts to delete the meeting from the database.
// - The controller interacts with the database to perform the deletion operation.
// - Depending on the outcome, the server sends an appropriate HTTP response back to the client.
// - The client receives the response and updates its interface accordingly.
