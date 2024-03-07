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

exports.ledControls = {
	async setLeds(req, res) {
		// Extract color information from the request body
		let { hue, saturation, value } = req.body;

		// If saturation or value are empty, null, or undefined, set them to 255
		saturation = saturation || 255;
		value = value || 255;

		// Check if hue is a color name, if so, replace it with its corresponding hue value
		if (stringToHue[hue] || hue === "red") {
			hue = stringToHue[hue];
		}

		// Construct data object with color information
		const data = {
			hue: parseInt(hue),
			saturation: parseInt(saturation),
			value: parseInt(value),
		};

		console.error("data");
		console.error(data);

		try {
			// Send request to ESP32 endpoint using Axios
			console.error("data");
			const response = await axios.post(
				"http://192.168.4.1/esp32/setLeds",
				data
			);
			console.error("data");

			// Check if response is successful
			if (!response.data || response.status !== 200) {
				throw new Error("Invalid response from ESP32");
			}

			// Send success response to the client
			res.status(200).json({ message: "LEDs set to specified color" });
		} catch (error) {
			// Handle errors
			console.error("There was a problem with the Axios request:", error);
			// Send error response to the client
			res.status(500).json({ error: "Internal server error" });
		}
	},

	async toggleBlink(req, res) {
		console.log("toggleBlink");
	},

	async func2(req, res) {
		console.log("func2");
	},
};
