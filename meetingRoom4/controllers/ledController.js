// can be used to control more advanced led functions that cant easily be defined as preset functions within the cpp code of the esp32

exports.ledControls = {
	async setLeds(req, res) {
		console.log("setLeds");
	},

	async toggleBlink(req, res) {
		console.log("toggleBlink");
	},

	async func2(req, res) {
		console.log("func2");
	},
};
