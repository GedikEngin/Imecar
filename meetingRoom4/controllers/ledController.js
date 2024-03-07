// can be used to control more advanced led functions that cant easily be defined as preset functions within the cpp code of the esp32
const axios = require("axios");
const { roomController } = require("../controllers/roomController");
const { meetingController } = require("../controllers/meetingController");

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

	async toggleBlink(req, res) {
		try {
			// Implement logic to toggle LED blinking
			res.json({ message: "LED blinking toggled" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async checkNextMeeting(req, res) {
		try {
			// Get current date and time
			const currentDate = new Date();

			// Get all rooms using getAllRoomsLed
			const rooms = await roomController.getAllRoomsLed();

			// Iterate over each room
			for (const room of rooms) {
				// Get meetings for the current room on the current date
				const meetings = await meetingController.getMeetingsByRoomDateLed(
					room.roomID,
					currentDate.toISOString().split("T")[0]
				);

				// Iterate over meetings to find the next one
				for (const meeting of meetings) {
					const meetingStartDate = new Date(
						meeting.meetingDate + "T" + meeting.meetingStart
					);
					const meetingEndDate = new Date(
						meeting.meetingDate + "T" + meeting.meetingEnd
					);

					// Check if the meeting starts within the next 15 minutes and has not already started
					if (
						meetingStartDate.getTime() > currentDate.getTime() &&
						meetingStartDate.getTime() - currentDate.getTime() <= 15 * 60 * 1000
					) {
						console.log(`Meeting in 15 minutes in ${room.roomName} - Yellow`);
						// Execute setMeetingLed with yellow color
						await this.setMeetingLed("yellow");
					}

					// Check if the meeting is ongoing
					if (
						currentDate >= meetingStartDate &&
						currentDate <= meetingEndDate
					) {
						console.log(`Meeting ongoing in ${room.roomName} - Red`);
						// Execute setMeetingLed with red color
						await this.setMeetingLed("red");
					}

					// Check if the meeting has ended within the last 15 minutes
					if (
						currentDate > meetingEndDate &&
						currentDate.getTime() - meetingEndDate.getTime() <= 15 * 60 * 1000
					) {
						console.log(`Meeting ended in ${room.roomName} - Green`);
						// Execute setMeetingLed with green color for 15 minutes
						await this.setMeetingLed("green");
					}
				}
			}
		} catch (error) {
			console.error("Error checking next meeting:", error);
		}
	},

	async setMeetingLed(color) {
		// Logic to control LED based on color
	},
};
