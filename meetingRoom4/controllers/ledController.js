// can be used to control more advanced led functions that cant easily be defined as preset functions within the cpp code of the esp32

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

		console.log("hue");
		console.log(hue);
		// Check if hue is a color name, if so, replace it with its corresponding hue value
		if (stringToHue[hue]) {
			hue = stringToHue[hue];
		}

		// Construct data object with color information
		const data = {
			hue: parseInt(hue),
			saturation: parseInt(saturation),
			value: parseInt(value),
		};

		console.log("Body:");
		console.log(req.body);
		console.log("");
		console.log("");
		console.log("");
		console.log("data:");
		console.log(data);

		try {
			// Send request to ESP32 endpoint using fetch
			const response = await fetch("http://192.168.4.1/esp32/setLeds", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			// Check if response is successful
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			// Parse response body as JSON
			const responseData = await response.json();
			console.log(responseData); // Log response data

			// Send success response to the client
			res.status(200).json({ message: "LEDs set to specified color" });
		} catch (error) {
			// Handle errors
			console.error("There was a problem with the fetch operation:", error);
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
