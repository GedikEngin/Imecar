const { Sequelize } = require("sequelize");
const userModel = require("../models/userModel");
const roomModel = require("../models/roomModel");
const meetingModel = require("../models/meetingModel");
require("dotenv").config();

const sequelize = new Sequelize({
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	dialect: process.env.DB_DIALECT,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

const User = userModel(sequelize, Sequelize);
const Room = roomModel(sequelize, Sequelize);
const Meeting = meetingModel(sequelize, Sequelize);

// Define associations
Meeting.hasOne(User, { foreignKey: "userID" });
Meeting.hasOne(Room, { foreignKey: "roomID" });

// Sync models with the database
sequelize
	.sync({ force: false }) // Set to true to force table creation on every app start
	.then(() => {
		console.log("Database & tables synced");
	})
	.catch((err) => {
		console.error("Error syncing database & tables: ", err);
	});

// Connect function
async function connect() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

// Close function
async function close() {
	try {
		await sequelize.close();
		console.log("Connection has been closed successfully.");
	} catch (error) {
		console.error("Unable to close the database connection:", error);
	}
}

module.exports = { sequelize, User, Room, Meeting, connect, close };
