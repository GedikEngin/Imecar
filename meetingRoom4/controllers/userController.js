// userController.js

const { User } = require("../models/userModel"); // Import the User model

// Controller function to register a new user
exports.register = async (req, res) => {
	try {
		const { username, password, permission, department } = req.body;

		// Check if a user with the same username already exists
		const existingUser = await User.findOne({ where: { username } });
		if (existingUser) {
			return res.status(400).json({ message: "Username is already taken" });
		}

		// Create a new user in the database
		const newUser = await User.create({
			username,
			password, // Make sure to hash the password before storing it in the database
			permission,
			department,
		});

		res.status(201).json(newUser);
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// Controller function to login a user
exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Find the user in the database
		const user = await User.findOne({ where: { username } });

		// Verify password
		if (!user || user.password !== password) {
			return res.status(401).json({ message: "Invalid username or password" });
		}

		res.json(user);
	} catch (error) {
		console.error("Error logging in user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// Controller function to delete a user by ID
exports.deleteUserByID = async (req, res) => {
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
};

// Controller function to delete a user by username
exports.deleteUserByUsername = async (req, res) => {
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
};
