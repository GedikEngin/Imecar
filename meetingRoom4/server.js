require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRouter = require("./routers/userRouter");
const roomRouter = require("./routers/roomRouter");
const meetingRouter = require("./routers/meetingRouter");
const authRouter = require("./routers/authRouter");
const microEspRouter = require("./routers/microEspRouter");
const ledRouter = require("./routers/ledRouter");

const { ledControls } = require("./controllers/ledController"); // Import ledControls

const cron = require("node-cron");
const cookieParser = require("cookie-parser");
const { connect } = require("./configs/dbConfig");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors());

// Mount routers
app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/meeting", meetingRouter);
app.use("/auth", authRouter);
app.use("/led", ledRouter);
app.use("/microesp", microEspRouter);

async function startServer() {
	try {
		await connect();

		// Start the server after establishing the database connection
		const server = app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});

		// Initial check after 2.5 seconds
		setTimeout(async () => {
			console.log("Running initial checkNextMeeting after 2.5 seconds");
			await ledControls.checkNextMeeting(); // Call checkNextMeeting directly
		}, 2500);

		// Schedule the checkNextMeeting function to run every 1 minute
		cron.schedule("*/1 * * * *", async () => {
			console.log("Running checkNextMeeting every 1 minute");
			await ledControls.checkNextMeeting(); // Call checkNextMeeting directly
		});
	} catch (error) {
		console.error("Error connecting to the database:", error);
		process.exit(1);
	}
}

startServer();
