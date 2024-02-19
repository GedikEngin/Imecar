// imports
const express = require("express");

const { registerValidator } = require("./validators/registerValidator");
const { loginValidator } = require("./validators/loginValidator");
const { publicController } = require("./controllers/publicController");

const userRouter = require(`./routes/userRouter`);
const roomRouter = require(`./routes/roomRouter`);
const { createRoomValidator } = require("./validators/roomValidator");
// const meetingRouter = require(`/routes/meetingRouter`);

require("dotenv").config();

// instantiation
const app = express();
const port = process.env.PORT || 8080;

// middlewares
app.use(express.json()); // express' built-in JSON middleware

app.use(`/user`, userRouter);
app.use(`/room`, roomRouter);
// app.use(`/meeting`, meetingRouter);

// api outs -- url endpoints
app.get(`/`, (req, res) => res.send({ message: `from /, hello` }));

app.post(`/register`, registerValidator, publicController.register);

app.post(`/login`, loginValidator, publicController.login);

app.post(`/createRoom`, createRoomValidator, publicController.createRoom);

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
// 	// in postman url http://localhost:8080/user/:id/username/:name
// 	const { id, name } = req.params;
// 	res.send({ id: id, username: name }); // user /:id at the end of the url path to use it as an input/pass it as a parameter
// }); // in postman use "/:id" to create a path variable instead of a query

// app.get(`/user/queryParam`, (req, res) => {
// 	// in postman http://localhost:8080/user/queryParam?id=2 to use a query param key
// 	const { id } = req.query;
// 	res.send({ id: id });
// });

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
