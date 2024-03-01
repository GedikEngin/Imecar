require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { serialize } = require("cookie");

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET; // Use JWT secret key from .env file

exports.auth = {
	// This function takes a password and returns a promise that resolves with the hashed password.
	async hashPassword(password) {
		return await bcrypt.hash(password, saltRounds);
	},

	// This function takes a password and a hashed password and returns a promise that resolves with a boolean indicating whether the password matches the hashed password.
	async checkPassword(password, hashedPassword) {
		return bcrypt.compare(password, hashedPassword);
	},

	// This function takes a user object and returns a JWT token.
	async generateToken(user, res) {
		const { userID } = user;
		const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		// Set the token as a cookie
		const tokenCookie = serialize("token", token, {
			httpOnly: false,
			maxAge: 3600000, // 1 hour
			secure: false, // Set to true if you're using HTTPS
			sameSite: "strict",
			path: "/", // Ensure the cookie is available for all routes
		});
		// Add the cookie to the response headers
		res.setHeader("Set-Cookie", tokenCookie);

		return token;
	},

	//This function takes a user object and returns a refresh token.
	async refreshToken(user) {
		const { _id, id } = user;
		return jwt.sign({ _id, id }, JWT_SECRET, { expiresIn: "48h" });
	},

	// This function takes a token and returns the decoded payload.
	async verifyToken(token) {
		try {
			const decoded = jwt.verify(token, JWT_SECRET);
			return decoded;
		} catch (error) {
			console.error("Token verification failed:", error);
			return null;
		}
	},
};
