const bcrypt = require("bcrypt");
const { close, connect, User, Room, Meeting } = require("../config/dbConfig"); // Import to trigger the database connection and table creation, imports User, Room, Meeting

exports.userController = {
	async register(req, res) {
		await connect();

		let user = await User.findOne({ where: { username: req.body.username } });

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

		close();

		res.send(user);
	},

	async login(req, res) {
		await connect();

		let user = await User.findOne({ where: { username: req.body.username } });

		if (!user) {
			return res
				.status(400)
				.json({ errors: { message: "user does not exists" } });
		}

		if (bcrypt.compareSync(req.body.password, user.password)) {
			res.send({
				userID: user.userID,
				permission: user.permission,
				department: user.department,
			});
		} else {
			return res
				.status(400)
				.json({ errors: { message: "user does not exists" } });
		}
	},
};
