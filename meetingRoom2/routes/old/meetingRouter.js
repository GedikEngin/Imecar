const meetingController = require(`../controllers/meetingController.js`);
const router = require(`express`).Router();

router.post(`/createMeeting`, meetingController.createMeeting);
router.post(`/getMeetingRoomIDPost/`, meetingController.getMeetingsRoomIDPost); // for calender

router.get(`/getAllMeetings`, meetingController.getAllMeetings);
router.get(`/getAllMeetingsBetween`, meetingController.getAllMeetingsBetween);
router.get(`/getMeetingUserID/`, meetingController.getMeetingsUserID);
router.get(`/getMeetingRoomID/`, meetingController.getMeetingsRoomID);

router.delete(`/deleteMeeting/`, meetingController.deleteMeeting);

router.put(`/updateMeeting/`, meetingController.updateMeeting);

module.exports = router;
