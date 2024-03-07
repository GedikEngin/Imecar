const { MicroEsp, connect } = require("../configs/dbConfig");

exports.microEspController = {
	async addMicroEsp(req, res) {
		await connect();
		try {
			const { microEspIP, microEspLed, roomID } = req.body;
			const newMicroEsp = await MicroEsp.create({
				microEspIP,
				microEspLed,
				roomID,
			});
			res.status(201).json(newMicroEsp);
		} catch (error) {
			console.error("Error creating MicroEsp:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},

	async getAllMicroEsp(req, res) {
		await connect();
		try {
			const microEspList = await MicroEsp.findAll();
			res.json(microEspList);
		} catch (error) {
			console.error("Error retrieving MicroEsp:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},

	async getMicroEspIP(req, res) {
		await connect();
		try {
			const { microEspIP } = req.params;
			const microEsp = await MicroEsp.findOne({ where: { microEspIP } });
			if (!microEsp) {
				return res.status(404).json({ message: "MicroEsp not found" });
			}
			res.json(microEsp);
		} catch (error) {
			console.error("Error retrieving MicroEsp:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},

	async getMicroEspID(req, res) {
		await connect();
		try {
			const { microEspID } = req.params;
			const microEsp = await MicroEsp.findByPk(microEspID);
			if (!microEsp) {
				return res.status(404).json({ message: "MicroEsp not found" });
			}
			res.json(microEsp);
		} catch (error) {
			console.error("Error retrieving MicroEsp:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},

	async getMicroEspIP(roomID) {
		try {
			const microEsp = await MicroEsp.findOne({
				where: { roomID, microEspLed: true },
			});
			return microEsp;
		} catch (error) {
			console.error("Error retrieving MicroEsp:", error);
			throw error; // Re-throw the error to handle it in the calling function
		}
	},

	async deleteMicroEspID(req, res) {
		await connect();
		try {
			const { microEspID } = req.params;
			const deletedMicroEsp = await MicroEsp.destroy({ where: { microEspID } });
			if (!deletedMicroEsp) {
				return res.status(404).json({ message: "MicroEsp not found" });
			}
			res.json({ message: "MicroEsp deleted successfully" });
		} catch (error) {
			console.error("Error deleting MicroEsp:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},

	async deleteMicroEspIPRoomID(req, res) {
		await connect();
		try {
			const { microEspIP, roomID } = req.params;
			const deletedMicroEsp = await MicroEsp.destroy({
				where: { microEspIP, roomID },
			});
			if (!deletedMicroEsp) {
				return res.status(404).json({ message: "MicroEsp not found" });
			}
			res.json({ message: "MicroEsp deleted successfully" });
		} catch (error) {
			console.error("Error deleting MicroEsp:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},
};
