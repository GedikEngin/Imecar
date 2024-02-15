module.exports = (sequelize, DataTypes) => {
	const Meeting = sequelize.define(`meeting`, {
		meetingID: {
			type: DataTypes.INTEGER,
			primaryKey: true, // This specifies id as the primary key
			autoIncrement: true, // Assuming it's an auto-incrementing field
		},
		userID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		roomID: {
			type: DataTypes.INTEGER,
			allowNull: false,
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
