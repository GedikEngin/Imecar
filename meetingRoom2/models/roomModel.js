const { DataTypes } = require("sequelize");
const { sequelise } = require("../config/dbConfig");

module.exports = (sequelize, DataTypes) => {
	const Room = sequelize.define(`room`, {
		roomID: {
			type: DataTypes.INTEGER,
			primaryKey: true, // This specifies id as the primary key
			autoIncrement: true, // Assuming it's an auto-incrementing field
		},
		roomName: {
			type: DataTypes.TEXT,
		},
		minPermission: {
			// access level
			type: DataTypes.INTEGER,
		},
		department: {
			type: DataTypes.TEXT,
		},
	});

	return Room;
};

// version with using validator (not express-validator)
// const validator = require("validator");
// module.exports = (sequelize, DataTypes) => {
// 	const Room = sequelize.define(`room`, {
// 		roomID: {
// 			type: DataTypes.INTEGER,
// 			primaryKey: true, // This specifies id as the primary key
// 			autoIncrement: true, // Assuming it's an auto-incrementing field
// 		},
// 		roomName: {
// 			type: DataTypes.TEXT,
// 			allowNull: false,
// 		},
// 		minPermission: {
// 			// access level
// 			type: DataTypes.INTEGER,
// 			allowNull: false,
// 			validate: {
// 				isIn: [[0, 1, 2, 3]],
// 			},
// 		},
// 		department: {
// 			type: DataTypes.TEXT,
// 			allowNull: false,
// 			validate: {
// 				isIn: [["software", "engineering", "design", "owner"]],
// 			},
// 		},
// 	});

// 	return Room;
// };
