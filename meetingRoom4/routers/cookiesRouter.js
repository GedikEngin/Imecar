const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const router = express.Router();

// Middleware to parse cookies
router.use(cookieParser());

// Route to decode the token cookie
router.get("/decodeToken", (req, res) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ message: "Token not found in cookies" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		res.json({ decoded });
	} catch (error) {
		res.status(400).json({ message: "Invalid or expired token" });
	}
});

module.exports = router;
