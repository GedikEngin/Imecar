const { body, validationResult } = require("express-validator");

// Register Validator
exports.registerValidator = [
	body("username").notEmpty().isString(),
	body("password").notEmpty().isString(),
	body("permission").notEmpty().isIn([0, 1, 2, 3]).toInt(),
	body("department")
		.notEmpty()
		.isIn(["software", "engineering", "design", "owner"]),
	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

// Login Validator
exports.loginValidator = [
	body("username").notEmpty().isString(),
	body("password").notEmpty().isString(),
	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];
