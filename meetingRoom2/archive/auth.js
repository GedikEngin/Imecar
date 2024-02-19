const bcrypt = require(`bcrypt`); // importing bcrypt
const jwt = require(`jsonwebtoken`); // importing jwt
const saltRounds = 10;

// This function takes a password and returns a promise that resolves with the hashed password.
const hashPassword = async (password) => {
	return await bcrypt.hash(password, saltRounds);
};

// This function takes a password and a hashed password and returns a promise that resolves with a boolean indicating whether the password matches the hashed password.
const checkPassword = (password, hashedPassword) => {
	return bcrypt.compare(password, hashedPassword);
};

// This function takes a user object and returns a JWT token.
const generateToken = (user) => {
	const { _id, userID } = user;
	return jwt.sign({ _id, userID }, process.env.TOKEN_SECRET, {
		expiresIn: "1h",
	});
};
//This function takes a user object and returns a refresh token.
const refreshToken = (user) => {
	const { _id, userID } = user;
	return jwt.sign({ _id, userID }, process.env.TOKEN_SECRET, {
		expiresIn: "1h",
	});
};
// This function takes a token and returns the decoded payload.
const verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		return decoded;
	} catch (error) {
		console.error("Token verification failed:", error);
		return null;
	}
};

module.exports = {
	hashPassword,
	checkPassword,
	generateToken,
	verifyToken,
	refreshToken,
};
