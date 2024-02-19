const express = require("express");
const router = express.Router();
const { userController } = require("../controllers/userController");

// Route to get all users
router.get("/getAllUsers", userController.getAllUsers);

// Route to get user by username
router.get("/getUserByName/:username", userController.getUserByName);

// Route to get user by ID
router.get("/getUserByID/:userID", userController.getUserByID);

// Route to delete user by ID
router.delete("/deleteUser/:userID", userController.deleteUser);

module.exports = router;
