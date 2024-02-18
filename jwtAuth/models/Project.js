const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbconfig");

const Project = sequelize.define("projects", {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
	name: DataTypes.STRING,
});

exports.Project = Project;
