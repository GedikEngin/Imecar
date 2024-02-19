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
User.hasMany(Meeting, { foreignKey: "userID" });
Meeting.belongsTo(User, { foreignKey: "userID" });

Room.hasMany(Meeting, { foreignKey: "roomID" });
Meeting.belongsTo(Room, { foreignKey: "roomID" });

// Custom Sync function to ensure correct order of table creation
async function customSync() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");

		// Sync Users and Rooms first
		await User.sync({ force: false });
		console.log("Users table synced successfully.");

		await Room.sync({ force: false });
		console.log("Rooms table synced successfully.");

		// Sync Meetings last to ensure foreign keys are available
		await Meeting.sync({ force: false });
		console.log("Meetings table synced successfully.");

		console.log("All tables synced successfully.");
	} catch (error) {
		console.error("Error syncing tables: ", error);
	}
}

// Call customSync to start the synchronization process to allow the
customSync();

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
