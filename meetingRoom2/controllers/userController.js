const { close, connect, User, Room, Meeting } = require("../config/dbConfig"); // Import to trigger the database connection and table creation, imports User, Room, Meeting

exports.userController = {
	async getUserByName(username) {
		const user = await User.findOne({ where: { username: username } });

		return user;
	},

	async getUser(req, res) {
		let user = await User.findByPk(req.params.userID);

		if (!user) {
			res.status(404).json({ errors: { msg: "user not found" } });
		} else res.send;
	},

	async deleteUser(req, res) {
		let user = await User.findByPk(req.params.userID);

		if (!user) {
			res.status(404).json({ errors: { msg: "user not found" } });
		} else {
			user.destroy;
			res.send({ message: "user deleted" });
		}
	},
};
