module.exports = (sequelize, DataTypes) => {
	const Meeting = sequelize.define(`meeting`, {
		meetingID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
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
		userID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "users",
				key: "userID",
			},
		},
		roomID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "rooms",
				key: "roomID",
			},
		},
	});
	return Meeting;
};
