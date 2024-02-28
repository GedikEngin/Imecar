module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(`user`, {
		userID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		permission: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		username: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		department: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});

	return User;
};
