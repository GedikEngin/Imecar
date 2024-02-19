// imports
const express = require("express");
require("dotenv").config();
require("./config/dbConfig"); // Import to trigger the database connection and table creation

// instantiation
const app = express();
const port = process.env.PORT || 8080;

// middlewares
app.use(express.json()); // express' built-in JSON middleware

// api outs -- url endpoints
app.get(`/`, (req, res) => res.send({ message: `from /, hello` }));

app.post(`/register`, (req, res) => )



// would not work as is, needs a middleware to format data before entering any request into api
// works after adding it
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
