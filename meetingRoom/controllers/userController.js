// userController.js
// meant to handle user verification instructions
// i.e:
// - sets isLoggedIn to true,
// - sends it to cookies for it to be checked
// - users auth.js to do checking
// - compares it in auth.js and receives a bool flag
// - dictates what needs to be done based on response from auth.js and frontend

require("sequelize"); // imports op for comparisons
require("dotenv").config(); // needed to be able to access .env file containing token key
const db = require(`../models`); // importing models file
const auth = require("../authorization/auth.js");
const User = db.users; // imports users table from db as User

//Register
// creates a meeting
const register = async (req, res) => {
	try {
		let unhashedPassword = req.body.password;
		const hashedPassword = await auth.hashPassword(unhashedPassword);

		let userData = {
			permission: req.body.permission,
			username: req.body.username,
			password: hashedPassword,
			department: req.body.department,
		};

		// If no overlapping meeting found, create the new meeting
		const user = await User.create(userData);
		res.status(200).send(user);
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).send("Error user meeting.");
	}
};

//Login
const login = async (req, res) => {
	try {
		const { username, password } = await req.body;

		if (!username || !password) {
			return res.status(400).send("Username or password is missing");
		}
		const user = await User.findOne({ where: { username } });

		if (!user) {
			return res.status(404).send("User not found");
		}

		const token = await auth.generateToken(user);

		// this is where the token is set = to token within the console > application > storage > cookies
		res.cookie("token", token, {
			// httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24,
		});

		if (!token) {
			return res.status(401).send("Token is missing");
		}

		async function getPasswords() {
			try {
				const verified = await auth.verifyToken(token);
				const data = await User.findAll(
					{ where: { userID: verified.userID } },
					{ dataValues: ["password"] }
				);

				const passwords = data.map((user) => user.dataValues.password);
				return passwords;
			} catch (error) {
				console.error("Error:", error);
				return [];
			}
		}
		const dbPasswordsPromise = await getPasswords();

		const isPasswordValid = await auth.checkPassword(
			password,
			dbPasswordsPromise[0]
		);

		if (!isPasswordValid) {
			return res.status(401).send("Invalid password");
		}
		res.status(200).send(token);
	} catch (error) {
		res.status(500).send(error.message);
	}
};

const getAllUsers = async (req, res) => {
	let users = await User.findAll({});
	res.status(200).send(users);
};

module.exports = {
	login,
	register,
	getAllUsers,
};
