const axios = require("axios");
const { roomController } = require("../controllers/roomController");
const { meetingController } = require("../controllers/meetingController");
const { microEspController } = require("../controllers/microEspController"); // Import microEspController

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

	// Function to check the status of upcoming meetings and control LEDs accordingly
	async checkNextMeeting() {
		try {
			// Get current date and time
			const currentDate = new Date();

			// Fetch all rooms
			const rooms = await roomController.getAllRoomsLed();

			// Iterate over each room
			for (const room of rooms) {
				// Fetch microEsp by room ID
				const microEsp = await microEspController.getMicroEspIP(room.roomID);
				if (!microEsp) {
					console.error(`MicroEsp not found for room ${room.roomName}`);
					continue;
				}

				// Fetch meetings for the current room on the current date
				const meetings = await meetingController.getMeetingsByRoomDateLed(
					room.roomID,
					currentDate.toISOString().split("T")[0]
				);

				// Iterate over meetings
				for (const meeting of meetings) {
					const meetingStartDate = new Date(
						meeting.meetingDate + "T" + meeting.meetingStart
					);
					const meetingEndDate = new Date(
						meeting.meetingDate + "T" + meeting.meetingEnd
					);

					// Calculate time differences in milliseconds
					const timeUntilMeetingStart =
						meetingStartDate.getTime() - currentDate.getTime();
					const timeSinceMeetingEnd =
						currentDate.getTime() - meetingEndDate.getTime();

					// Status 1: Meeting starts within the next 15 minutes
					if (
						timeUntilMeetingStart <= 15 * 60 * 1000 &&
						timeUntilMeetingStart > 0
					) {
						const timeUntilMeeting = Math.ceil(
							timeUntilMeetingStart / 1000 / 60
						);
						console.log(
							`Meeting in ${timeUntilMeeting} minutes in ${room.roomName} - Yellow`
						);
						await this.setLedsInternal({
							microEspIP: microEsp.microEspIP,
							hue: stringToHue.yellow,
							saturation: 255,
							value: 255,
						});
					}

					// Status 2: Meeting is ongoing
					if (
						currentDate >= meetingStartDate &&
						currentDate <= meetingEndDate
					) {
						console.log(`Meeting ongoing in ${room.roomName} - Red`);
						const timeUntilEnd = Math.ceil(
							(meetingEndDate.getTime() - currentDate.getTime()) / 1000 / 60
						);
						console.log(`Time until meeting ends: ${timeUntilEnd} minutes`);
						await this.setLedsInternal({
							microEspIP: microEsp.microEspIP,
							hue: stringToHue.red,
							saturation: 255,
							value: 255,
						});
					}

					// Status 3: Meeting has ended within the last 15 minutes
					if (
						timeSinceMeetingEnd <= 15 * 60 * 1000 &&
						timeSinceMeetingEnd > 0
					) {
						console.log(`Meeting ended in ${room.roomName} - Green`);
						const timeSinceEnd = Math.ceil(timeSinceMeetingEnd / 1000 / 60);
						console.log(
							`Time elapsed since meeting ended: ${timeSinceEnd} minutes`
						);
						await this.setLedsInternal({
							microEspIP: microEsp.microEspIP,
							hue: stringToHue.green,
							saturation: 255,
							value: 255,
						});
					}
				}
			}
		} catch (error) {
			console.error("Error checking next meeting:", error);
		}
	},

	async setLedsUI(req, res) {
		try {
			const { microEspIP, hue, saturation, value } = req.body;

			// Construct URL with query parameters
			const url = `http://${microEspIP}/esp32/setLeds?hue=${hue}&saturation=${saturation}&value=${value}`;
			// Send GET request with Axios

			const response = await axios.get(url);
			res.json(response.data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Function to set LEDs internally
	async setLedsInternal({ microEspIP, hue, saturation, value }) {
		try {
			// Construct URL with query parameters
			const url = `http://${microEspIP}/esp32/setLeds?hue=${hue}&saturation=${saturation}&value=${value}`;
			// Send GET request with Axios
			const response = await axios.get(url);
			console.log(response.data); // Log the response data
		} catch (error) {
			console.error("Error setting LEDs internally:", error);
		}
	},

	// Function to set LED colors based on the button box input
	async setLedsButtonBox(req, res) {
		console.log("setLedsButtonBox");
		try {
			const { hue, saturation, value, microEspIP } = req.body;

			// Construct URL with query parameters
			const url = `http://${microEspIP}/esp32/setLeds?hue=${String(
				hue
			)}&saturation=${String(saturation)}&value=${String(value)}`;

			// Send GET request with Axios
			const response = await axios.get(url);
			res.json(response.data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async startAnimationButtonBox(req, res) {
		console.log("startAnimationButtonBox");

		microEspIP = req.query.microEspIP;

		try {
			// Construct URL with query parameters
			const url = `http://${microEspIP}/esp32/startAnimation`;

			// Send GET request with Axios
			const response = await axios.get(url);
			res.json(response.data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};
