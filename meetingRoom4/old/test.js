// Require necessary modules
const { sequelize } = require("../configs/dbConfig"); // Adjust the path as needed
const { Meeting } = require("../models/meetingModel"); // Adjust the paths as needed
const { Room } = require("../models/roomModel"); // Adjust the paths as needed
const { User } = require("../models/userModel"); // Adjust the paths as needed

// Custom Sync function to synchronize models with the database
async function syncDatabase() {
	try {
		await sequelize.sync({ force: true }); // Sync models with the database (drop existing tables if force is true)
		console.log("Database synchronized successfully.");
	} catch (error) {
		console.error("Error synchronizing database:", error);
	}
}

// Call the syncDatabase function to initiate database synchronization
syncDatabase();
