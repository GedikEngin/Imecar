const { body, validationResult } = require("express-validator");

exports.createMeetingValidator = [
	body("userID").notEmpty().isInt(),
	body("roomID").notEmpty().isInt(),
	body("meetingDate").notEmpty().isISO8601(),
	body("meetingStart").notEmpty().isString(),
	body("meetingEnd").notEmpty().isString(),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];
