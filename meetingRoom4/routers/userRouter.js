const express = require("express");
const router = express.Router();
const { userController } = require("../controllers/userController");

const { auth, tokens, cookies } = require("../middlewares/auth/auth"); // Import auth

const {
	registerValidator,
	loginValidator,
} = require("../validators/userValidator");

// Route for user registration
router.post("/register", registerValidator, userController.register);

// Route for user login
router.post("/login", loginValidator, userController.login);

// Route to get all users
router.get("/users", userController.getAllUsers);

// Route to get a user by ID
router.get("/search/userID/:userID", userController.getUserByID);

// Route to get a user by name
router.get("/search/userName/:username", userController.getUserByName);

// Route to delete a user by ID (requires authentication)
router.delete(
	"/delete/userID/:userID",
	cookies.verifyAndAttachUser,
	userController.deleteUserByID
);

// Route to delete a user by username (requires authentication)
router.delete(
	"/delete/userName/:username",
	cookies.verifyAndAttachUser,
	userController.deleteUserByName
);

module.exports = router;
