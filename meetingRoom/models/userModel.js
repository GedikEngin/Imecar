module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(`user`, {
		userID: {
			type: DataTypes.INTEGER,
			primaryKey: true, // This specifies id as the primary key
			autoIncrement: true, // Assuming it's an auto-incrementing field
		},
		permission: {
			// access level
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		userName: {
			type: DataTypes.TEXT,
			allowNull: false,
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

	return User;
};
