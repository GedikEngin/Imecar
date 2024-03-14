// acts as a router for button box to led controller

const express = require("express");
const router = express.Router();
const { ledControls } = require("../controllers/ledController");

router.post("/setLed", ledControls.setLeds);
router.post("/setLedUI", ledControls.setLedsUI);
router.post("/setLedsButtonBox", ledControls.setLedsButtonBox);
router.get("/startAnimationButtonBox", ledControls.startAnimationButtonBox);
router.get("/checkNextMeeting", ledControls.checkNextMeeting);

module.exports = router;
