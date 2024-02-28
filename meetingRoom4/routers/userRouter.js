// userRouter.js

const express = require("express");
const router = express.Router();
const {
	register,
	login,
	deleteUserByID,
	deleteUserByUsername,
} = require("../controllers/userController");
const {
	registerValidator,
	loginValidator,
} = require("../validators/userValidator");

// Route for user registration
router.post("/register", registerValidator, register);

// Route for user login
router.post("/login", loginValidator, login);

// Route to delete a user by ID
router.delete("/users/:userID", deleteUserByID);

// Route to delete a user by username
router.delete("/users/username/:username", deleteUserByUsername);

module.exports = router;
