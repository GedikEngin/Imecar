const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbconfig");

const User = sequelize.define("users", {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
	firstname: DataTypes.STRING,
	lastname: DataTypes.STRING,
	email: DataTypes.STRING,
});

exports.User = User;
