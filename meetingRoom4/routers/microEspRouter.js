const express = require("express");
const router = express.Router();
const { microEspController } = require("../controllers/microEspController");

// Route for creating a MicroEsp
router.post("/add", microEspController.addMicroEsp);

// Route to get all MicroEsps
router.get("/microesp", microEspController.getAllMicroEsp);

// Route to get a MicroEsp by IP
router.get("/search/microEspIP/:microEspIP", microEspController.getMicroEspIP);

// Route to get a MicroEsp by ID
router.get("/search/microEspID/:microEspID", microEspController.getMicroEspID);

// Route to delete a MicroEsp by ID
router.delete("/delete/microEspID/:microEspID", microEspController.deleteMicroEspID);

// Route to delete a MicroEsp by IP and roomID
router.delete("/delete/microEspIPRoomID/:microEspIP/:roomID", microEspController.deleteMicroEspIPRoomID);

module.exports = router;
