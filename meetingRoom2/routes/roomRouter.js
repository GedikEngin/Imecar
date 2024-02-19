const express = require("express");
const router = express.Router();
const { roomController } = require("../controllers/roomController");

// Route to get all rooms
router.get("/getAllRooms", roomController.getAllRooms);

// Route to get room by name
router.get("/getRoomByName/:roomName", roomController.getRoomByName);

// Route to get room by ID
router.get("/getRoomByID/:roomID", roomController.getRoomByID);

// Route to delete room by ID
router.delete("/deleteRoom/:roomID", roomController.deleteRoom);

module.exports = router;
