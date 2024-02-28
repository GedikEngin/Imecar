// userRouter.js

const express = require("express");
const router = express.Router();
// const {
// 	register,
// 	login,
// 	deleteUserByID,
// 	deleteUserByUsername,
// } = require("../controllers/userController");

const userController = require("../controllers/userController");

const {
	registerValidator,
	loginValidator,
} = require("../validators/userValidator");

// Route for user registration
router.post("/register", registerValidator, userController.register);

// Route for user login
router.post("/login", loginValidator, userController.login);

// Route to get all users
router.get("/user", userController.getAllUsers);

// Route to get a user by ID
router.get("/users/:userID", userController.getUserByID);

// Route to get a user by name
router.get("/users/name/:username", userController.getUserByName);

// Route to delete a user by ID
router.delete("/users/:userID", userController.deleteUserByID);

// Route to delete a user by username
router.delete("/users/username/:username", userController.deleteUserByName);

module.exports = router;
