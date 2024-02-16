module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(`user`, {
		userID: {
			type: DataTypes.UUID,
			primaryKey: true, // This specifies id as the primary key
			autoIncrement: true, // Assuming it's an auto-incrementing field
		},
		permission: {
			// access level
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
