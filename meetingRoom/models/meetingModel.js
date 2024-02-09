module.exports = (sequelize, DataTypes) => {
	const Meeting = sequelize.define(`meeting`, {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		meetingStart: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		meetingEnd: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	});

	return Meeting;
};
