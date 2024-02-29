const express = require("express");
const router = express.Router();
const { roomController } = require("../controllers/roomController");
const { createRoomValidator } = require("../validators/roomValidator");

// Route to create a room
router.post("/create", createRoomValidator, roomController.createRoom);

// Route to get all rooms
router.get("/rooms", roomController.getAllRooms);

// Route to get a room by ID
router.get("/search/roomID/:roomID", roomController.getRoomByID);

// Route to get a room by name
router.get("/search/roomName/:roomName", roomController.getRoomByName);

// Route to delete a room by ID
router.delete("/delete/roomID/:roomID", roomController.deleteRoomByID);

// Route to delete a room by name
router.delete("/delete/roomName/:roomName", roomController.deleteRoomByName);

module.exports = router;
