const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const { createRoomValidator } = require("../validators/roomValidator");

// Route to get all rooms
router.get("/rooms", roomController.getAllRooms);

// Route to create a room
router.post("/rooms", createRoomValidator, roomController.createRoom);

// Route to get a room by ID
router.get("/rooms/:roomID", roomController.getRoomByID);

// Route to get a room by name
router.get("/rooms/name/:roomName", roomController.getRoomByName);

// Route to delete a room by ID
router.delete("/rooms/:roomID", roomController.deleteRoomByID);

// Route to delete a room by name
router.delete("/rooms/name/:roomName", roomController.deleteRoomByName);

module.exports = router;
