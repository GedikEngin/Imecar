// entry point/file for code
// imports express
const express = require(`express`);

// creates express app instance
const app = express();

// port for the server grabbed from env or when running dev uses 7070
const PORT = process.env.PORT || 7070;

// middleware
app.set("view engine", "ejs");

// api outs -- url endpoints
app.get(`/`, (req, res) => res.render("index"));

app.get("/users/login", (req, res) => {
	res.render("login");
});

app.get("/users/register", (req, res) => {
	res.render("register");
});

app.get("/users/dashboard", (req, res) => {
	res.render("dashboard", { username: "engin" });
});

app.listen(PORT, () => console.log(`server running ${PORT}`));

// // old code
// // middlewares
// app.use(express.json()); // express' build in json middleware
// // would not work as is, needs a middleware to format data before entering any request into api
// // works after adding it
// app.post(`/user`, (req, res) => {
// 	// gets data from the body

// 	const body = req.body;
// 	res.send(body);
// });

// // app.get(`/user/:id`, (req, res) => { // in postman use "/:id" to create a path variable instead of a query
// // 	const { id } = req.params;
// // 	res.send({ id: id }); // user /:id at the end of the url path to use it as an input/pass it as a parameter
// // });

// app.get(`/user/:id/username/:name`, (req, res) => {
// 	// in postman url http://localhost:7070/user/:id/username/:name
// 	const { id, name } = req.params;

// 	res.send({ id: id, username: name }); // user /:id at the end of the url path to use it as an input/pass it as a parameter
// }); // in postman use "/:id" to create a path variable instead of a query

// app.get(`/user/queryParam`, (req, res) => {
// 	// in postman http://localhost:7070/user/queryParam?id=2 to use a query param key
// 	const { id } = req.query;
// 	res.send({ id: id });
// });
