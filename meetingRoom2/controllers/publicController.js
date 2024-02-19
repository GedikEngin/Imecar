const bcrypt = require("bcrypt");
const { close, connect, User, Room, Meeting } = require("../config/dbConfig"); // Import to trigger the database connection and table creation, imports User, Room, Meeting
const { userController } = require("./userController");
const { userResponseParser } = require("../parser/userResponseParser");

exports.publicController = {
	async register(req, res) {
		await connect();

		let user = await userController.getUserByName(req.body.username);

		if (user) {
			return res
				.status(400)
				.json({ errors: { message: "user already exists" } });
		}

		const hashedPassword = bcrypt.hashSync(req.body.password, 10);

		user = await User.create({
			permission: req.body.permission,
			username: req.body.username,
			password: hashedPassword,
			department: req.body.department,
		});

		res.send(userResponseParser(user));
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
};
