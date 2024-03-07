const express = require("express");
const cors = require("cors");
require("dotenv").config();

const cookieParser = require("cookie-parser"); // Import cookie-parser
const userRouter = require("./routers/userRouter");
const roomRouter = require("./routers/roomRouter");
const meetingRouter = require("./routers/meetingRouter");
const ledRouter = require("./routers/ledRouter");
const authRouter = require("./routers/authRouter"); // Update to authRouter
const { connect } = require("./configs/dbConfig"); // Import the connect function

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware
app.use(express.static("public")); // Serve static files from the public directory
app.use(cors()); // allowing the use of cors

app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/meeting", meetingRouter);
app.use("/auth", authRouter);
app.use("/led", ledRouter);

// Connect to the database when the server starts
connect()
	.then(() => {
		// Start the server after establishing the database connection
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((error) => {
		console.error("Error connecting to the database:", error);
		process.exit(1); // Exit with error
	});
