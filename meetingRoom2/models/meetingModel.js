module.exports = (sequelize, DataTypes) => {
	const Meeting = sequelize.define(`meeting`, {
		meetingID: {
			type: DataTypes.INTEGER,
			primaryKey: true, // This specifies id as the primary key
			autoIncrement: true, // Assuming it's an auto-incrementing field
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

	// // Define associations

	return Meeting;
};
