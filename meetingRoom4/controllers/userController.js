// userController.js

const { User, connect } = require("../configs/dbConfig"); // importing relevant model (with sequelize) from dbconfig

exports.userController = {
	// Controller function to register a new user
	async register(req, res) {
		await connect();
		console.log("entering register");
		console.log(req.body);
		try {
			// Check if a user with the same username already exists
			const existingUser = await User.findOne({
				where: { username: req.body.username },
			});
			if (existingUser) {
				return res.status(400).json({ message: "Username is already taken" });
			}

			// Create a new user in the database
			const newUser = await User.create({
				username: req.body.username,
				password: req.body.password, // Make sure to hash the password before storing it in the database
				permission: req.body.permission,
				department: req.body.department,
			});

			res.status(201).json(newUser);
		} catch (error) {
			console.error("Error registering user:", error);
			res.status(500).json({ message: "Internal server error" });
		}
		await close();
	},

	// Function to get all users
	async getAllUsers(req, res) {
		await connect();
		try {
			// Retrieve all rooms from the database
			const users = await User.findAll();
			res.json(users);
		} catch (error) {
			console.error("Error retrieving users:", error);
			res.status(500).json({ message: "Internal server error" });
		}
		await close();
	},

	// Controller function to get a room by ID
	async getUserByID(req, res) {
		await connect();
		try {
			const { userID } = req.params;
			const user = await User.findByPk(userID);
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			res.json(user);
		} catch (error) {
			console.error("Error retrieving user:", error);
			res.status(500).json({ message: "Internal server error" });
		}
		await close();
	},

	// Controller function to get a user by name
	async getUserByName(req, res) {
		await connect();
		try {
			const { username } = req.params;
			const user = await User.findOne({ where: { username } });
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			res.json(user);
		} catch (error) {
			console.error("Error retrieving user:", error);
			res.status(500).json({ message: "Internal server error" });
		}
		await close();
	},

	// Controller function to login a user
	async login(req, res) {
		await connect();
		try {
			const { username, password } = req.body;

			// Find the user in the database
			const user = await User.findOne({ where: { username } });

			// Verify password
			if (!user || user.password !== password) {
				return res
					.status(401)
					.json({ message: "Invalid username or password" });
			}

			res.json(user);
		} catch (error) {
			console.error("Error logging in user:", error);
			res.status(500).json({ message: "Internal server error" });
		}
		await close();
	},

	// Controller function to delete a user by ID
	async deleteUserByID(req, res) {
		await connect();
		try {
			const { userID } = req.params;

			// Find the user by ID
			const user = await User.findByPk(userID);
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			// Delete the user
			await user.destroy();

			res.json({ message: "User deleted successfully" });
		} catch (error) {
			console.error("Error deleting user:", error);
			res.status(500).json({ message: "Internal server error" });
		}
		await close();
	},

	// Controller function to delete a user by username
	async deleteUserByName(req, res) {
		await connect();
		try {
			const { username } = req.params;

			// Find the user by username
			const user = await User.findOne({ where: { username } });
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			// Delete the user
			await user.destroy();

			res.json({ message: "User deleted successfully" });
		} catch (error) {
			console.error("Error deleting user:", error);
			res.status(500).json({ message: "Internal server error" });
		}
		await close();
	},
};
