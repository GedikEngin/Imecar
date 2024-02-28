module.exports = (sequelize, DataTypes) => {
	const Room = sequelize.define(`room`, {
		roomID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		roomName: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		minPermission: {
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
