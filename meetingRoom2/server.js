// imports
const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const { close, connect, User, Room, Meeting } = require("./config/dbConfig"); // Import to trigger the database connection and table creation, imports User, Room, Meeting

require("dotenv").config();
// instantiation
const app = express();
const port = process.env.PORT || 8080;

// middlewares
app.use(express.json()); // express' built-in JSON middleware

// api outs -- url endpoints
app.get(`/`, (req, res) => res.send({ message: `from /, hello` }));

// data validation using express validator
// can be done within the database fields,
// app.post(`/register`, { additional parameters, i.e. middleware goes here } , (req, res) => )
app.post(
	`/register`,
	body("username").notEmpty().isString(),
	body("password").notEmpty().isString(),
	body("permission").notEmpty().isIn([0, 1, 2, 3]).toInt(),
	body("department")
		.notEmpty()
		.isIn(["software", "engineering", "design", "owner"]),
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		await connect();

		const user = await User.findOne({ where: { username: req.body.username } });

		if (user) {
			return res
				.status(400)
				.json({ errors: { message: "user already exists" } });
		}

		const hashedPassword = bcrypt.hashSync(req.body.password, 10);

		user = await User.create({
			permission: req.body.permission,
			username: req.body.username,
			password: hashedPassword,
			department: req.body.department,
		});
		res.send(user);
	}
);

app.post(`/user`, (req, res) => {
	// gets data from the body
	const body = req.body;
	res.send(body);
});

// app.get(`/user/:id`, (req, res) => { // in postman use "/:id" to create a path variable instead of a query
// 	const { id } = req.params;
// 	res.send({ id: id }); // user /:id at the end of the url path to use it as an input/pass it as a parameter
// });

app.get(`/user/:id/username/:name`, (req, res) => {
	// in postman url http://localhost:8080/user/:id/username/:name
	const { id, name } = req.params;
	res.send({ id: id, username: name }); // user /:id at the end of the url path to use it as an input/pass it as a parameter
}); // in postman use "/:id" to create a path variable instead of a query

app.get(`/user/queryParam`, (req, res) => {
	// in postman http://localhost:8080/user/queryParam?id=2 to use a query param key
	const { id } = req.query;
	res.send({ id: id });
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
