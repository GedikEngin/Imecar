// Import necessary modules and DTOs
const { User, connect } = require("../configs/dbConfig");
const { auth, tokens, cookies } = require("../middlewares/auth/auth");
const errorResponse = require("../middlewares/responses/errorResponse");
const successResponse = require("../middlewares/responses/successResponse");
const { UserDTO } = require("../middlewares/dtos/userDTO");

// Define the userController object
exports.userController = {
	// Function to register a new user
	async register(req, res) {
		await connect(); // Ensure database connection
		try {
			const { username, password, permission, department } = req.body;

			// Check if a user with the same username already exists
			const existingUser = await User.findOne({ where: { username } });
			if (existingUser) {
				// Return error response if user already exists
				return res
					.status(400)
					.json(errorResponse(400, "Username is already taken"));
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

			// Create user DTO
			const userDTO = new UserDTO(
				newUser.userID,
				newUser.username,
				newUser.permission,
				newUser.department
			);

			// Return success response with user DTO
			res
				.status(201)
				.json(successResponse(userDTO, "User registered successfully"));
		} catch (error) {
			console.error("Error registering user:", error);
			// Return error response if registration fails
			res.status(500).json(errorResponse(500, "Internal server error"));
		}
	},

	// Function to log in a user
	async login(req, res) {
		await connect(); // Ensure database connection
		try {
			const { username, password } = req.body;

			// Find the user in the database
			const user = await User.findOne({ where: { username } });
			if (!user) {
				// Return error response if user not found
				return res
					.status(401)
					.json(errorResponse(401, "Invalid username or password"));
			}

			// Check password
			const passwordMatch = await auth.checkPassword(password, user.password);
			if (!passwordMatch) {
				// Return error response if password doesn't match
				return res
					.status(401)
					.json(errorResponse(401, "Invalid username or password"));
			}

			// Generate JWT tokens
			const accessToken = await tokens.generateAccessToken(user.userID);
			const refreshToken = await tokens.generateRefreshToken(user.userID);

			// Set access token as a cookie
			res.cookie("accessToken", accessToken, { httpOnly: false });

			// Set refresh token as an HTTP-only cookie
			res.cookie("refreshToken", refreshToken, { httpOnly: true });

			// Return success response
			res.json(successResponse(null, "Login successful"));
		} catch (error) {
			console.error("Error logging in user:", error);
			// Return error response if login fails
			res.status(500).json(errorResponse(500, "Internal server error"));
		}
	},

	// Function to retrieve all users
	async getAllUsers(req, res) {
		await connect(); // Ensure database connection
		try {
			// Retrieve all users from the database
			const users = await User.findAll();

			// Map users to user DTOs
			const userDTOs = users.map(
				(user) =>
					new UserDTO(
						user.userID,
						user.username,
						user.permission,
						user.department
					)
			);

			// Return success response with user DTOs
			res.json(successResponse(userDTOs));
		} catch (error) {
			console.error("Error retrieving users:", error);
			// Return error response if retrieval fails
			res.status(500).json(errorResponse(500, "Internal server error"));
		}
	},

	// Function to retrieve a user by ID
	async getUserByID(req, res) {
		await connect(); // Ensure database connection
		try {
			const { userID } = req.params;

			// Find the user by ID
			const user = await User.findByPk(userID);
			if (!user) {
				// Return error response if user not found
				return res.status(404).json(errorResponse(404, "User not found"));
			}

			// Create user DTO
			const userDTO = new UserDTO(
				user.userID,
				user.username,
				user.permission,
				user.department
			);

			// Return success response with user DTO
			res.json(successResponse(userDTO));
		} catch (error) {
			console.error("Error retrieving user:", error);
			// Return error response if retrieval fails
			res.status(500).json(errorResponse(500, "Internal server error"));
		}
	},

	// Function to retrieve a user by name
	async getUserByName(req, res) {
		await connect(); // Ensure database connection
		try {
			const { username } = req.params;

			// Find the user by username
			const user = await User.findOne({ where: { username } });
			if (!user) {
				// Return error response if user not found
				return res.status(404).json(errorResponse(404, "User not found"));
			}

			// Create user DTO
			const userDTO = new UserDTO(
				user.userID,
				user.username,
				user.permission,
				user.department
			);

			// Return success response with user DTO
			res.json(successResponse(userDTO));
		} catch (error) {
			console.error("Error retrieving user:", error);
			// Return error response if retrieval fails
			res.status(500).json(errorResponse(500, "Internal server error"));
		}
	},

	// Function to delete a user by ID
	async deleteUserByID(req, res) {
		await connect(); // Ensure database connection
		try {
			const { userID } = req.params;

			// Find the user by ID
			const user = await User.findByPk(userID);
			if (!user) {
				// Return error response if user not found
				return res.status(404).json(errorResponse(404, "User not found"));
			}

			// Delete the user
			await user.destroy();

			// Return success response
			res.json(successResponse(null, "User deleted successfully"));
		} catch (error) {
			console.error("Error deleting user:", error);
			// Return error response if deletion fails
			res.status(500).json(errorResponse(500, "Internal server error"));
		}
	},

	// Function to delete a user by username
	async deleteUserByName(req, res) {
		await connect(); // Ensure database connection
		try {
			const { username } = req.params;

			// Find the user by username
			const user = await User.findOne({ where: { username } });
			if (!user) {
				// Return error response if user not found
				return res.status(404).json(errorResponse(404, "User not found"));
			}

			// Delete the user
			await user.destroy();

			// Return success response
			res.json(successResponse(null, "User deleted successfully"));
		} catch (error) {
			console.error("Error deleting user:", error);
			// Return error response if deletion fails
			res.status(500).json(errorResponse(500, "Internal server error"));
		}
	},
};
