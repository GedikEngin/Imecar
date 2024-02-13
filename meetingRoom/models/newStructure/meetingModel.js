module.exports = (sequelize, DataTypes) => {
	const Meeting = sequelize.define(`meeting`, {
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
