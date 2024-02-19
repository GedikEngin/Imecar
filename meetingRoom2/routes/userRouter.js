const express = require("express");
const router = express.Router();
const { userController } = require("../controllers/userController");

router.get("/:userID", userController.getUser);
router.delete("/:userID", userController.deleteUser);

module.exports = router;
