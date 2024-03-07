// can be used to control more advanced led functions that cant easily be defined as preset functions within the cpp code of the esp32
const axios = require("axios");

const stringToHue = {
	blue: 170,
	blueGreen: 127,
	green: 85,
	greenYellow: 42,
	yellow: 21,
	yellowOrange: 15,
	orange: 10,
	orangeRed: 5,
	red: 0,
	redViolet: 213,
	violet: 191,
	violetBlue: 170,
};

// ledController.js
exports.ledControls = {
	async setLeds(req, res) {
		try {
			const { hue, saturation, value } = req.body;
			// Construct URL with path variables
			const url = `http://192.168.4.1:8080/esp32/setLeds/${hue}/${saturation}/${value}`;
			// Send GET request with Axios
			const response = await axios.get(url);
			res.json(response.data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async toggleBlink(req, res) {
		try {
			// Implement logic to toggle LED blinking
			res.json({ message: "LED blinking toggled" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async func2(req, res) {
		try {
			// Implement logic for another LED control function
			res.json({ message: "Function 2 executed" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};
