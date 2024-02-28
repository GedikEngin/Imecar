// imports
const express = require("express");
const userRouter = require("./routers/userRouter");
const roomRouter = require("./routers/roomRouter");
const meetingRouter = require("./routers/meetingRouter");
require("dotenv").config();

// instantiation
const app = express();
const port = process.env.PORT || 8080;

// Use middleware for parsing JSON requests
app.use(express.json());

// Use routers
app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/meeting", meetingRouter);

// Start server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
