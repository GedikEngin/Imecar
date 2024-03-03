const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const { cookies } = require("../middlewares/auth/auth");
const router = express.Router();

// Middleware to parse cookies
router.use(cookieParser());

// Route to decode the token cookie
router.get("/decodeToken", cookies.verifyAndAttachUser, (req, res) => {
	const decoded = req.user;
	res.json({ decoded });
});

module.exports = router;
