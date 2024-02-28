const express = require("express");
const userRouter = require("./routers/userRouter");
const roomRouter = require("./routers/roomRouter");
const meetingRouter = require("./routers/meetingRouter");
const { connect } = require("./configs/dbConfig"); // Import the connect function
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/meeting", meetingRouter);

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
