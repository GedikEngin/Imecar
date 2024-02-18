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
	return Meeting;
};
