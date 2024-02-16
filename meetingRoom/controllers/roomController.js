// userController.js
// meant to handle user verification instructions
// i.e:
// - sets isLoggedIn to true,
// - sends it to cookies for it to be checked
// - users auth.js to do checking
// - compares it in auth.js and receives a bool flag
// - dictates what needs to be done based on response from auth.js and frontend

require("sequelize"); // imports op for comparisons
require("dotenv").config(); // needed to be able to access .env file containing token key
const db = require(`../models`); // importing models file
const Room = db.rooms; // imports users table from db as User

//Register
// creates a meeting
const createRoom = async (req, res) => {
	try {
		let roomData = {
			minPermission: req.body.minPermission,
			roomName: req.body.roomName,
			department: req.body.department,
		};

		// If no overlapping meeting found, create the new meeting
		const room = await Room.create(roomData);
		res.status(200).send(room);
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).send("Error user meeting.");
	}
};

const getAllRooms = async (req, res) => {
	let rooms = await Room.findAll({});
	res.status(200).send(rooms);
};

module.exports = {
	createRoom,
	getAllRooms,
};
