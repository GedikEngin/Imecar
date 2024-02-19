const { DataTypes } = require("sequelize");
const { sequelise } = require("../config/dbConfig");

module.exports = (sequelize, DataTypes) => {
	const Meeting = sequelize.define(`meeting`, {
		meetingID: {
			type: DataTypes.INTEGER,
			primaryKey: true, // This specifies id as the primary key
			autoIncrement: true, // Assuming it's an auto-incrementing field
		},
		meetingDate: {
			type: DataTypes.DATEONLY,
		},
		meetingStart: {
			type: DataTypes.TIME,
		},
		meetingEnd: {
			type: DataTypes.TIME,
		},
	});

	return Meeting;
};
