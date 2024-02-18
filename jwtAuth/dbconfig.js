const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("jwtauth", "root", "root", {
	dialect: "mysql",
	host: "localhost",
});

function init() {
	sequelize
		.sync({
			alter: true,
		})
		.then((res) => {
			console.log("Database connection successful");
		})
		.catch((err) => console.log("Errors", err));
}

// async function connect() {
// 	try {
// 		await sequelize.authenticate();
// 		console.log("Connection has been established successfully.");
// 	} catch (error) {
// 		console.error("Unable to connect to the database:", error);
// 	}
// }

function close() {
	sequelize.close();
}

exports.sequelize = sequelize;
exports.init = init;
// exports.connect = connect;
// exports.close = close;

const { User } = require("./models/User");
const { Team } = require("./models/Team");
const { Project } = require("./models/Project");

Team.hasMany(Project, {
	foreignKey: {
		allowNull: true,
	},
});
Team.hasMany(User, {
	foreignKey: {
		name: "team_id",
		allowNull: true,
	},
});
