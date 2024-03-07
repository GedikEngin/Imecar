const { Sequelize } = require("sequelize");
const userModel = require("../models/userModel");
const roomModel = require("../models/roomModel");
const meetingModel = require("../models/meetingModel");
const microEspModel = require("../models/microEspModel");

require("dotenv").config();

const sequelize = new Sequelize({
	logging: false,
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
const MicroEsp = microEspModel(sequelize, Sequelize); // Add this line

let isConnected = false;

// Define associations
User.hasMany(Meeting, { foreignKey: "userID" });
Meeting.belongsTo(User, { foreignKey: "userID" });

Room.hasMany(Meeting, { foreignKey: "roomID" });
Meeting.belongsTo(Room, { foreignKey: "roomID" });

Room.hasMany(MicroEsp, { foreignKey: "roomID" });
MicroEsp.belongsTo(Room, { foreignKey: "roomID" });

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

		// Sync MicroEsp last to ensure foreign keys are available
		await MicroEsp.sync({ force: false });
		console.log("MicroEsp table synced successfully.");

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
		if (!isConnected) {
			await sequelize.authenticate();
			console.log("Connection has been established successfully.");
			isConnected = true;
		} else {
			// If already connected, re-authenticate without logging anything to the console
			await sequelize.authenticate();
		}
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

module.exports = { sequelize, User, Room, Meeting, MicroEsp, connect, close };
