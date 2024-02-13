module.exports = (sequelize, DataTypes) => {
	const Meeting = sequelize.define(`roomDate`, {
		roomID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		minPermission: {
			// access level
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		department: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});

	return Meeting;
};
