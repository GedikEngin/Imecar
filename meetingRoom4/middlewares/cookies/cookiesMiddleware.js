const jwt = require("jsonwebtoken");
const { parse } = require("cookie");
require("dotenv").config();

const verifyAndAttachUser = (req, res, next) => {
	const cookieHeader = req.headers.cookie;
	if (!cookieHeader) {
		return res.status(401).json({ message: "No cookies sent" });
	}

	const cookies = parse(cookieHeader);
	const token = cookies.token;

	if (!token) {
		return res.status(401).json({ message: "Token not found in cookies" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded; // Attach the decoded token to the request object
		next();
	} catch (error) {
		return res.status(400).json({ message: "Invalid token" });
	}
};

module.exports = { verifyAndAttachUser };
