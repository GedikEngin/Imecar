const bcrypt = require("bcrypt");
const { close, connect, User, Room, Meeting } = require("../config/dbConfig"); // Import to trigger the database connection and table creation, imports User, Room, Meeting
const { userController } = require("./userController");
const { roomController } = require("./roomController");
const { userResponseParser } = require("../parser/userResponseParser");
const { roomResponseParser } = require("../parser/roomResponseParser");

exports.publicController = {
	async register(req, res) {
		await connect();

		const username = req.body.username;

		try {
			// Check if a user with the given username exists
			const existingUser = await User.findOne({
				where: { username: username },
			});

			if (existingUser) {
				// User already exists, send a response with an error message
				return res
					.status(400)
					.json({ errors: { message: "User already exists" } });
			}

			// If the user does not exist, proceed with user creation
			const hashedPassword = bcrypt.hashSync(req.body.password, 10);

			const newUser = await User.create({
				permission: req.body.permission,
				username: username,
				password: hashedPassword,
				department: req.body.department,
			});

			// Send a response with the newly created user
			res
				.status(201)
				.json({ message: "User created successfully", user: newUser });
		} catch (error) {
			console.error("Error in register:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	},

	async login(req, res) {
		await connect();

		let user = await userController.getUserByName(req.body.username);

		if (!user) {
			return res
				.status(400)
				.json({ errors: { message: "user does not exists" } });
		}

		if (bcrypt.compareSync(req.body.password, user.password)) {
			res.send(userResponseParser(user));
		} else {
			return res
				.status(400)
				.json({ errors: { message: "user does not exists" } });
		}
	},

	async createRoom(req, res) {
		await connect();

		let room = await roomController.getRoomByName(req.body.roomName);

		if (room) {
			return res
				.status(400)
				.json({ errors: { message: "room already exists" } });
		}

		room = await User.create({
			roomName: req.body.roomName,
			minPermission: req.body.minPermission,
			department: req.body.department,
		});

		res.send(roomResponseParser(room));
	},
};
