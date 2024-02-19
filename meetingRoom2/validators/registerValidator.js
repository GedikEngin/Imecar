const { body, validationResult } = require("express-validator");

// data validation using express validator
// can be done within the database fields,
// app.post(`/register`, { additional parameters, i.e. middleware goes here } , (req, res) => )

exports.registerValidator = [
	body("username").notEmpty().isString(),
	body("password").notEmpty().isString(),
	body("permission").notEmpty().isIn([0, 1, 2, 3]).toInt(),
	body("department")
		.notEmpty()
		.isIn(["software", "engineering", "design", "owner"]),
	(req, res, next) => {
		validationResult(req);
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];
