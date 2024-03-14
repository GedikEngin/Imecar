require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const cron = require("node-cron");

const userRouter = require("./routers/userRouter");
const roomRouter = require("./routers/roomRouter");
const meetingRouter = require("./routers/meetingRouter");
const authRouter = require("./routers/authRouter");
const microEspRouter = require("./routers/microEspRouter");
const ledRouter = require("./routers/ledRouter");

const { ledControls } = require("./controllers/ledController");
const { connect } = require("./configs/dbConfig");

const app = express();
const port = process.env.PORT || 8080;

// Swagger options
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "MeetingRoomProject",
			version: "4.0.0",
		},
		servers: [
			{
				url: "http://localhost:8080",
			},
		],
	},
	apis: [
		"./routers/*.js", // Path to the API router files
		"./controllers/*.js", // Path to the controller files
	],
};

const swaggerSpec = swaggerJSDoc(options);

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

// Serve Swagger UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

async function startServer() {
	try {
		await connect();

		// Start the server after establishing the database connection
		const server = app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});

		// Initial check after 2.5 seconds
		setTimeout(async () => {
			await ledControls.checkNextMeeting();
		}, 2500);

		// Schedule the checkNextMeeting function to run every 1 minute
		cron.schedule("*/1 * * * *", async () => {
			await ledControls.checkNextMeeting();
		});
	} catch (error) {
		console.error("Error connecting to the database:", error);
		process.exit(1);
	}
}

startServer();
