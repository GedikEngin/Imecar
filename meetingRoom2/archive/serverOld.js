const express = require(`express`); // importing express
const cors = require(`cors`); // importing cors
const path = require("path");
const auth = require("./auth/auth.js");
require(`bcrypt`); // importing bcrypt
// const dotenv = require("dotenv").config(); // needed to be able to access .env file containing token key
// ^^ not needed, use process.env.TOKEN_SECRET instead to refer to it

const app = express(); // instantiating express app

var corOptions = {
	origin: `https://localhost:8081`, // setting url, third party api origin target
};

// middler
app.use(cors(corOptions)); // middler that is being used

app.use(express.json()); // using express json as that is how we are getting all data from api and website

app.use(express.urlencoded({ extended: true })); // returns middler that parses url encoded bodies and only looks at the requests that match the content type header

app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the public directory middler for the site

// error catching middler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong!");
});

// routers

// middleware for verifying -- potential idea//for redoing
// app.use((req, res, next) => {
// 	console.log("1");
// 	console.log(req.headers);

// 	const authHeader = req.headers.cookie;
// 	console.log("2");

// 	if (!authHeader) {
// 		console.log("3");
// 		return res.status(401).json({ message: "Missing authorization header" });
// 	}
// 	console.log("4");
// 	const token = authHeader.split("=")[1];
// 	console.log("5");

// 	console.log(token);
// 	console.log("6");
// 	try {
// 		console.log("7");
// 		const payload = auth.verifyToken(token);
// 		console.log("8");
// 		req.user = payload;
// 		console.log("9");
// 		next();
// 		console.log("10");
// 	} catch (err) {
// 		console.log("11");
// 		return res.status(401).json({ message: "Invalid token" });
// 	}
// 	console.log("12");
// });

const router = require(`./routes/meetingRouter.js`); // imports router
app.use(`/api/meetings`, router);

const routerUser = require(`./routes/userRouter.js`);
app.use(`/api/users`, routerUser);

const routerRoom = require(`./routes/roomRouter.js`);
app.use(`/api/rooms`, routerRoom);

// testing api

app.get("/", (req, res) => {
	// sends an api message to address "/", it has a a request param and a response
	res.json({ message: `hello from api` });
});

// port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
	// returns which port the server is running on
	console.log(`server is running on port ${PORT}`);
});
