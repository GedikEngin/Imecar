module.exports = (sequelize, DataTypes) => {
	const Room = sequelize.define(`room`, {
		roomID: {
			type: DataTypes.INTEGER,
			primaryKey: true, // This specifies id as the primary key
			autoIncrement: true, // Assuming it's an auto-incrementing field
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

	return Room;
};
