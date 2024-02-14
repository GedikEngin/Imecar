const bcrypt = require(`bcrypt`); // importing bcrypt
const jwt = require(`jwt`); // importing jwt
const dotenv = require("dotenv").config(); // needed to be able to access .env file containing token key
const saltRounds = 10;

// This function takes a password and returns a promise that resolves with the hashed password.
export async function hashPassword(password) {
	return await bcrypt.hash(password, saltRounds);
}

// This function takes a password and a hashed password and returns a promise that resolves with a boolean indicating whether the password matches the hashed password.
export function checkPassword(password, hashedPassword) {
	return bcrypt.compare(password, hashedPassword);
}

// This function takes a user object and returns a JWT token.
export function generateToken(user) {
	const { _id, id } = user;
	return jwt.sign({ _id, id }, TOKEN_SECRET, { expiresIn: "1h" });
}
//This function takes a user object and returns a refresh token.
export function refreshToken(user) {
	const { _id, id } = user;
	return jwt.sign({ _id, id }, TOKEN_SECRET, { expiresIn: "1h" });
}
// This function takes a token and returns the decoded payload.
export function verifyToken(token) {
	try {
		const decoded = jwt.verify(token, TOKEN_SECRET);
		return decoded;
	} catch (error) {
		console.error("Token verification failed:", error);
		return null;
	}
}

export default {
	hashPassword,
	checkPassword,
	generateToken,
	verifyToken,
	refreshToken,
};
