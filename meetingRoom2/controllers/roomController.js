const { close, connect, User, Room, Meeting } = require("../config/dbConfig");

exports.roomController = {
	async getAllRooms(req, res) {
		const rooms = await Room.findAll({});
		res.send(rooms);
	},

	async getRoomByName(req, res) {
		const roomName = req.params.roomName;
		const room = await Room.findOne({ where: { roomName: roomName } });
		res.send(room);
	},

	async getRoomByID(req, res) {
		let room = await Room.findByPk(req.params.roomID);

		if (!room) {
			res.status(404).json({ errors: { msg: "room not found" } });
		} else {
			res.send(room);
		}
	},

	async deleteRoom(req, res) {
		let room = await Room.findByPk(req.params.roomID);

		if (!room) {
			res.status(404).json({ errors: { msg: "room not found" } });
		} else {
			await room.destroy();
			res.send({ message: "room deleted" });
		}
	},
};
