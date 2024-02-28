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
