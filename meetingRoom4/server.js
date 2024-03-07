require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRouter = require("./routers/userRouter");
const roomRouter = require("./routers/roomRouter");
const meetingRouter = require("./routers/meetingRouter");
const authRouter = require("./routers/authRouter");
const ledRouter = require("./routers/ledRouter");
const microEspRouter = require("./routers/microEspRouter");

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
		setTimeout(() => {
			console.log("Running initial checkNextMeeting after 2.5 seconds");
			ledRouter.get("/checkNextMeeting");
		}, 2500);

		// Schedule the checkNextMeeting function to run every 5 minutes
		cron.schedule("*/5 * * * *", () => {
			console.log("Running checkNextMeeting every 5 minutes");
			ledRouter.get("/checkNextMeeting");
		});
	} catch (error) {
		console.error("Error connecting to the database:", error);
		process.exit(1);
	}
}

startServer();
