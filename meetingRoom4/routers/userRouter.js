/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operations related to users
 */

const express = require("express");
const router = express.Router();
const { userController } = require("../controllers/userController");

const { auth, tokens, cookies } = require("../middlewares/auth/auth");

const {
    registerValidator,
    loginValidator,
} = require("../validators/userValidator");

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     tags: [User]
 *     summary: Register a new user
 *     description: Register a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User successfully registered.
 *       '400':
 *         description: Invalid request or missing required parameters.
 */
router.post("/register", registerValidator, userController.register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags: [User]
 *     summary: Log in user
 *     description: Log in a user with the provided credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       '200':
 *         description: User successfully logged in.
 *       '401':
 *         description: Unauthorized - invalid credentials.
 */
router.post("/login", loginValidator, userController.login);

/**
 * @swagger
 * /api/user/users:
 *   get:
 *     tags: [User]
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       '200':
 *         description: A list of users.
 */
router.get("/users", userController.getAllUsers);

/**
 * @swagger
 * /api/user/search/userID/{userID}:
 *   get:
 *     tags: [User]
 *     summary: Get user by ID
 *     description: Retrieve a user by their ID.
 *     parameters:
 *       - in: path
 *         name: userID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to retrieve.
 *     responses:
 *       '200':
 *         description: User found.
 *       '404':
 *         description: User not found.
 */
router.get("/search/userID/:userID", userController.getUserByID);

/**
 * @swagger
 * /api/user/search/userName/{username}:
 *   get:
 *     tags: [User]
 *     summary: Get user by name
 *     description: Retrieve a user by their username.
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user to retrieve.
 *     responses:
 *       '200':
 *         description: User found.
 *       '404':
 *         description: User not found.
 */
router.get("/search/userName/:username", userController.getUserByName);

/**
 * @swagger
 * /api/user/delete/userID/{userID}:
 *   delete:
 *     tags: [User]
 *     summary: Delete user by ID
 *     description: Delete a user by their ID (requires authentication).
 *     parameters:
 *       - in: path
 *         name: userID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete.
 *     responses:
 *       '200':
 *         description: User successfully deleted.
 *       '401':
 *         description: Unauthorized - user not authenticated.
 *       '404':
 *         description: User not found.
 */
router.delete(
    "/delete/userID/:userID",
    cookies.verifyAndAttachUser,
    userController.deleteUserByID
);

/**
 * @swagger
 * /api/user/delete/userName/{username}:
 *   delete:
 *     tags: [User]
 *     summary: Delete user by name
 *     description: Delete a user by their username (requires authentication).
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user to delete.
 *     responses:
 *       '200':
 *         description: User successfully deleted.
 *       '401':
 *         description: Unauthorized - user not authenticated.
 *       '404':
 *         description: User not found.
 */
router.delete(
    "/delete/userName/:username",
    cookies.verifyAndAttachUser,
    userController.deleteUserByName
);

module.exports = router;
