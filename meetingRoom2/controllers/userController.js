const { close, connect, User, Room, Meeting } = require("../config/dbConfig");

exports.userController = {
	async getAllUsers(req, res) {
		try {
			const users = await User.findAll({});
			res.send(users);
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" });
		}
	},

	async getUserByName(req, res) {
		try {
			const username = req.params.username;
			let user = await User.findOne({ where: { username: username } });

			res.send(user);
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" });
		}
	},

	async getUserByID(req, res) {
		try {
			let user = await User.findByPk(req.params.userID);

			if (!user) {
				res.status(404).json({ errors: { msg: "User not found" } });
			} else {
				res.send(user);
			}
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" });
		}
	},

	async deleteUser(req, res) {
		try {
			let user = await User.findByPk(req.params.userID);

			if (!user) {
				res.status(404).json({ errors: { msg: "User not found" } });
			} else {
				await user.destroy();
				res.send({ message: "User deleted" });
			}
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" });
		}
	},
};
