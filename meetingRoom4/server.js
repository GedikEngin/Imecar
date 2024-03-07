const express = require("express");
const cors = require("cors");
require("dotenv").config();

const cookieParser = require("cookie-parser");
const userRouter = require("./routers/userRouter");
const roomRouter = require("./routers/roomRouter");
const meetingRouter = require("./routers/meetingRouter");
const ledRouter = require("./routers/ledRouter");
const authRouter = require("./routers/authRouter");
const { connect } = require("./configs/dbConfig");
const cron = require("node-cron");
const { ledControls } = require("./controllers/ledController");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors());

app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/meeting", meetingRouter);
app.use("/auth", authRouter);
app.use("/led", ledRouter);

// regular start:
// connect()
// 	.then(() => {
// 		// Start the server after establishing the database connection
// 		app.listen(port, () => {
// 			console.log(`Server is running on port ${port}`);
// 		});
// 	})
// 	.catch((error) => {
// 		console.error("Error connecting to the database:", error);
// 		process.exit(1); // Exit with error
// 	});

// start with check meeting:
async function startServer() {
	try {
		await connect();

		// Start the server after establishing the database connection
		const server = app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});

		// Wait for 10 seconds before scheduling the checkNextMeeting function
		setTimeout(() => {
			// Schedule the checkNextMeeting function to run every 5 minutes
			cron.schedule("*/5 * * * *", () => {
				console.log("Running checkNextMeeting every 5 minutes");
				ledControls.checkNextMeeting();
			});

			// Call checkNextMeeting upon starting the server
			console.log("Running checkNextMeeting upon starting the server");
			ledControls.checkNextMeeting();
		}, 2500); // 10 seconds delay
	} catch (error) {
		console.error("Error connecting to the database:", error);
		process.exit(1); // Exit with error
	}
}

startServer();
