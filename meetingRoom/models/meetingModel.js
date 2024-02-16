const User = require("./userModel");
const Room = require("./roomModel");

module.exports = (sequelize, DataTypes) => {
	const Meeting = sequelize.define(`meeting`, {
		meetingID: {
			type: DataTypes.UUID,
			primaryKey: true, // This specifies id as the primary key
			autoIncrement: true, // Assuming it's an auto-incrementing field
		},
		userID: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: User,
				key: "userID",
			},
		},
		roomID: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: Room,
				key: "roomID",
			},
		},
		meetingDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		meetingStart: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		meetingEnd: {
			type: DataTypes.TIME,
			allowNull: false,
		},
	});

	Meeting.associate = (models) => {
		// Define associations here
		Meeting.belongsTo(models.User, { foreignKey: "userID" }); // Associate with User table
		Meeting.belongsTo(models.Room, { foreignKey: "roomID" }); // Associate with Room table
	};

	return Meeting;
};
