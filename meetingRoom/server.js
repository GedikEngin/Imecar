const express = require(`express`); // importing express
const cors = require(`cors`); // importing cors
const bodyParser = require("body-parser"); // for parsing data that is incoming, i.e. url's json's etc
const jwt = require("jsonwebtoken"); // creating identity confirming tokens to verify and authenticate info for data transfer
const bcrypt = require("bcryptjs"); // encryption lib using bcrypt hashing algo, can add salt for extra security
const userModel = require("./models/userModel"); // Assuming userModel.js contains your user model

const path = require("path"); // setting path for static site components

const app = express(); // instantiating express app

var corOptions = {
	origin: `https://localhost:8081`, // setting url, third party api origin target
};

// middler
app.use(cors(corOptions)); // middler that is being used

app.use(express.json()); // using express json as that is how we are getting all data from api and website

app.use(express.urlencoded({ extended: true })); // returns middler that parses url encoded bodies and only looks at the requests that match the content type header

app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the public directory middler for the site

app.use(bodyParser.json()); // middler for bodyparser

// error catching middler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong!");
});

// routers

const router = require(`./routes/meetingRouter.js`); // imports router
app.use(`/api/meetings`, router);

// testing api

app.get("/", (req, res) => {
	// sends an api message to address "/", it has a a request param and a response
	res.json({ message: `hello from api` });
});

// for logging in
app.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		// Check if user exists
		const user = await userModel.findOne({ where: { username } });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Check password
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return res.status(401).json({ message: "Invalid password" });
		}

		// Generate JWT token
		const token = jwt.sign({ userId: user.id }, "your_secret_key", {
			expiresIn: "1h",
		});

		res.status(200).json({ token });
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// verifying routes

function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Access denied. Missing token" });
	}

	jwt.verify(token, "your_secret_key", (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: "Invalid token" });
		}
		req.userId = decoded.userId;
		next();
	});
}

app.get("/protected-route", authenticateToken, (req, res) => {
	res.json({ message: "Protected route accessed successfully" });
});

// port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
	// returns which port the server is running on
	console.log(`server is running on port ${PORT}`);
});
