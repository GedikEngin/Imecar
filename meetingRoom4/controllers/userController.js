// userController.js

const { User, connect } = require("../configs/dbConfig"); // importing relevant model (with sequelize) from dbconfig
const { auth, tokens, cookies } = require("../middlewares/auth/auth"); // Import the auth object from auth.js

exports.userController = {
	// Controller function to register a new user
	async register(req, res) {
		await connect();
		try {
			const { username, password, permission, department } = req.body;

			// Check if a user with the same username already exists
			const existingUser = await User.findOne({
				where: { username },
			});
			if (existingUser) {
				return res.status(400).json({ message: "Username is already taken" });
			}

			// Hash the password
			const hashedPassword = await auth.hashPassword(password);

			// Create a new user in the database
			const newUser = await User.create({
				username,
				password: hashedPassword,
				permission,
				department,
			});

			res.status(201).json(newUser);
		} catch (error) {
			console.error("Error registering user:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},

	async login(req, res) {
		await connect();
		try {
			const { username, password } = req.body;

			// Find the user in the database
			const user = await User.findOne({
				where: { username },
			});

			if (!user) {
				return res
					.status(401)
					.json({ message: "Invalid username or password" });
			}

			// Check password
			const passwordMatch = await auth.checkPassword(password, user.password);
			if (!passwordMatch) {
				return res
					.status(401)
					.json({ message: "Invalid username or password" });
			}

			// Generate JWT tokens
			const accessToken = await tokens.generateAccessToken(user.userID);
			const refreshToken = await tokens.generateRefreshToken(user.userID);

			// Set access token as a cookie
			res.cookie("accessToken", accessToken, {
				httpOnly: false, // Access token should be accessible by JavaScript
			});

			// Set refresh token as an HTTP-only cookie
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true, // Refresh token should not be accessible by JavaScript
			});

			res.json({ message: "Login successful" });
		} catch (error) {
			console.error("Error logging in user:", error);
			res.status(500).json({ message: "Internal server error" });
		}
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
	},
};
