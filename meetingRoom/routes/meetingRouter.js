const meetingController = require(`../controllers/meetingController.js`);
const router = require(`express`).Router();

router.post(`/createMeeting`, meetingController.createMeeting);

router.get(`/getAllMeetings`, meetingController.getAllMeetings);
router.get(`/getAllMeetingsBetween`, meetingController.getAllMeetingsBetween);
router.get(`/getMeetingUserID/:userID`, meetingController.getMeetingsUserID);
router.get(`/getMeetingRoomID/:roomID`, meetingController.getMeetingsRoomID);

router.put(`/:userID&:roomID`, meetingController.updateMeeting);

router.delete(`/:userID&:roomID`, meetingController.deleteMeeting);

module.exports = router;
