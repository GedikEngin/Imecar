module.exports = (sequelize, DataTypes) => {
	const MicroEsp = sequelize.define(`microEsp`, {
		microEspID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		microEspIP: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		microEspLed: {
			type: DataTypes.BOOLEAN, // True = esp inside led bar, False = inside button box
			allowNull: false,
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

	return MicroEsp;
};
