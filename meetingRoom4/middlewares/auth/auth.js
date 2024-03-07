const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { serialize, parse } = require("cookie");
require("dotenv").config();

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// Number of salt rounds for password hashing
const saltRounds = 10;

exports.auth = {
	// Functions related to authentication (password hashing and verification)
	async hashPassword(password) {
		return await bcrypt.hash(password, saltRounds);
	},

	async checkPassword(password, hashedPassword) {
		return await bcrypt.compare(password, hashedPassword);
	},
};

exports.tokens = {
	// Functions related to tokens
	async generateAccessToken(userID) {
		return jwt.sign({ userID }, JWT_SECRET, { expiresIn: "2h" });
	},

	async generateRefreshToken(userID) {
		return jwt.sign({ userID }, JWT_REFRESH_SECRET, { expiresIn: "24h" });
	},
};

exports.cookies = {
	// Functions related to cookies
	async parseCookies(cookieHeader) {
		return parse(cookieHeader);
	},

	async verifyAndAttachUser(req, res, next) {
		const cookieHeader = req.headers.cookie;
		if (!cookieHeader) {
			return res.status(401).json({ message: "No cookies sent" });
		}

		const cookies = parse(cookieHeader);
		const accessToken = cookies.accessToken; // Change token to accessToken

		if (!accessToken) {
			return res
				.status(401)
				.json({ message: "Access token not found in cookies" });
		}

		try {
			const decoded = jwt.verify(accessToken, JWT_SECRET);
			req.user = decoded; // Attach the decoded token to the request object
			next();
		} catch (error) {
			return res.status(400).json({ message: "Invalid access token" });
		}
	},
};
