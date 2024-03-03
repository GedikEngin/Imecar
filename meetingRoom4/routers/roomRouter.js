// roomRouter.js

const express = require("express");
const router = express.Router();
const { roomController } = require("../controllers/roomController");
const { cookies } = require("../middlewares/auth/auth"); // Import the cookies object from auth.js
const { createRoomValidator } = require("../validators/roomValidator");

// Route for creating a room
router.post(
	"/create",
	cookies.verifyAndAttachUser, // Using verifyAndAttachUser middleware from cookies object
	createRoomValidator,
	roomController.createRoom
);

// Route to get all rooms
router.get("/rooms", cookies.verifyAndAttachUser, roomController.getAllRooms); // Using verifyAndAttachUser middleware from cookies object

// Route to get a room by ID
router.get(
	"/search/roomID/:roomID",
	cookies.verifyAndAttachUser, // Using verifyAndAttachUser middleware from cookies object
	roomController.getRoomByID
);

// Route to get a room by name
router.get(
	"/search/roomName/:roomName",
	cookies.verifyAndAttachUser, // Using verifyAndAttachUser middleware from cookies object
	roomController.getRoomByName
);

// Route to delete a room by ID
router.delete(
	"/delete/roomID/:roomID",
	cookies.verifyAndAttachUser, // Using verifyAndAttachUser middleware from cookies object
	roomController.deleteRoomByID
);

// Route to delete a room by name
router.delete(
	"/delete/roomName/:roomName",
	cookies.verifyAndAttachUser, // Using verifyAndAttachUser middleware from cookies object
	roomController.deleteRoomByName
);

module.exports = router;
