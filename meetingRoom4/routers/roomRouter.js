/**
 * @swagger
 * tags:
 *   name: Room
 *   description: Operations related to rooms
 */

const express = require("express");
const router = express.Router();
const { roomController } = require("../controllers/roomController");
const { cookies } = require("../middlewares/auth/auth");
const { createRoomValidator } = require("../validators/roomValidator");

/**
 * @swagger
 * /api/room/create:
 *   post:
 *     tags: [Room]
 *     summary: Create a new room
 *     description: Create a new room with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       '200':
 *         description: Room successfully created.
 *       '400':
 *         description: Invalid request or missing required parameters.
 */
router.post(
	"/create",
	cookies.verifyAndAttachUser,
	createRoomValidator,
	roomController.createRoom
);

/**
 * @swagger
 * /api/room/rooms:
 *   get:
 *     tags: [Room]
 *     summary: Get all rooms
 *     description: Retrieve a list of all rooms.
 *     responses:
 *       '200':
 *         description: A list of rooms.
 */
router.get("/rooms", cookies.verifyAndAttachUser, roomController.getAllRooms);

/**
 * @swagger
 * /api/room/search/roomID/{roomID}:
 *   get:
 *     tags: [Room]
 *     summary: Get room by ID
 *     description: Retrieve a room by its ID.
 *     parameters:
 *       - in: path
 *         name: roomID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the room to retrieve.
 *     responses:
 *       '200':
 *         description: Room found.
 *       '404':
 *         description: Room not found.
 */
router.get(
	"/search/roomID/:roomID",
	cookies.verifyAndAttachUser,
	roomController.getRoomByID
);

/**
 * @swagger
 * /api/room/search/roomName/{roomName}:
 *   get:
 *     tags: [Room]
 *     summary: Get room by name
 *     description: Retrieve a room by its name.
 *     parameters:
 *       - in: path
 *         name: roomName
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the room to retrieve.
 *     responses:
 *       '200':
 *         description: Room found.
 *       '404':
 *         description: Room not found.
 */
router.get(
	"/search/roomName/:roomName",
	cookies.verifyAndAttachUser,
	roomController.getRoomByName
);

/**
 * @swagger
 * /api/room/delete/roomID/{roomID}:
 *   delete:
 *     tags: [Room]
 *     summary: Delete room by ID
 *     description: Delete a room by its ID.
 *     parameters:
 *       - in: path
 *         name: roomID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the room to delete.
 *     responses:
 *       '200':
 *         description: Room successfully deleted.
 *       '401':
 *         description: Unauthorized - user not authenticated.
 *       '404':
 *         description: Room not found.
 */
router.delete(
	"/delete/roomID/:roomID",
	cookies.verifyAndAttachUser,
	roomController.deleteRoomByID
);

/**
 * @swagger
 * /api/room/delete/roomName/{roomName}:
 *   delete:
 *     tags: [Room]
 *     summary: Delete room by name
 *     description: Delete a room by its name.
 *     parameters:
 *       - in: path
 *         name: roomName
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the room to delete.
 *     responses:
 *       '200':
 *         description: Room successfully deleted.
 *       '401':
 *         description: Unauthorized - user not authenticated.
 *       '404':
 *         description: Room not found.
 */
router.delete(
	"/delete/roomName/:roomName",
	cookies.verifyAndAttachUser,
	roomController.deleteRoomByName
);

module.exports = router;
