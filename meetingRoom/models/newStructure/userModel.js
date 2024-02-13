module.exports = (sequelize, DataTypes) => {
	const Meeting = sequelize.define(`userData`, {
		userID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		permission: {
			// access level
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		userName: {
			type: DataTypes.TEXT,
		},
		userPass: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		department: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});

	return Meeting;
};
