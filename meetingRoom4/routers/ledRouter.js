// the commands and instructions from nodeJS app go to the esp32 from here
// acts as a router to the led methods within the esp32

const express = require("express");
const router = express.Router();
const { ledControls } = require("../controllers/ledController");

router.post("/setLed", ledControls.setLeds);
router.post("/setLedUI", ledControls.setLedsUI);
router.post("/setLedsButtonBox", ledControls.setLedsButtonBox);
router.post("/toggleBlinkButtonBox", ledControls.toggleBlinkButtonBox);
router.get("/checkNextMeeting", ledControls.checkNextMeeting);

module.exports = router;
