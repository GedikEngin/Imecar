window.onload = async function () {
	await loadRooms(); // Load rooms when the page loads
};

async function loadRooms() {
	try {
		const response = await fetch("/room/rooms"); // Fetch all rooms
		if (!response.ok) {
			throw new Error("Failed to fetch rooms");
		}
		const rooms = await response.json();
		const roomSelect = document.getElementById("roomSelect");
		rooms.forEach((room) => {
			const option = document.createElement("option");
			option.value = room.roomID;
			option.textContent = `${room.roomName} - ${room.department}`;
			roomSelect.appendChild(option);
		});

		// Automatically select the nearest past Monday as the starting date
		const currentDate = new Date();
		const dayOfWeek = currentDate.getDay();
		const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
		const startOfWeek = new Date(currentDate);
		startOfWeek.setDate(currentDate.getDate() - daysToMonday);
		document.getElementById("startDate").value = startOfWeek
			.toISOString()
			.split("T")[0];

		// Load the calendar
		await loadCalendar();
	} catch (error) {
		console.error("Error loading rooms:", error.message);
	}
}

async function loadCalendar() {
	try {
		const roomID = document.getElementById("roomSelect").value;
		const startDate = document.getElementById("startDate").value;
		const endDate = addDays(startDate, 6);
		const response = await fetch(
			`/meeting/search/between/${startDate}/${endDate}/${roomID}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch meetings");
		}
		const meetings = await response.json();
		renderCalendar(meetings, startDate);
	} catch (error) {
		console.error("Error loading calendar:", error.message);
	}
}

function renderCalendar(meetings, startDate) {
	const calendar = document.getElementById("calendar");
	calendar.innerHTML = ""; // Clear previous calendar

	const daysOfWeek = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];

	for (let i = 0; i < 7; i++) {
		const currentDate = new Date(startDate);
		currentDate.setDate(currentDate.getDate() + i);

		const dayDiv = document.createElement("div");
		dayDiv.classList.add("day");
		dayDiv.textContent = `${
			daysOfWeek[i]
		} (${currentDate.toLocaleDateString()})`;

		meetings.forEach((meeting) => {
			const meetingDate = new Date(meeting.meetingDate);
			if (meetingDate.toDateString() === currentDate.toDateString()) {
				const meetingDiv = document.createElement("div");
				meetingDiv.classList.add("meeting");
				meetingDiv.textContent = `${meeting.meetingStart} - ${meeting.meetingEnd}`;
				meetingDiv.setAttribute("data-meeting-id", meeting.meetingID); // Add meeting ID as data attribute
				meetingDiv.addEventListener("click", () => {
					handleMeetingSelection(meeting.meetingID); // Call handleMeetingSelection with meeting ID on click
				});

				dayDiv.appendChild(meetingDiv);
			}
		});

		calendar.appendChild(dayDiv);
	}
}

function addDays(dateString, days) {
	const date = new Date(dateString);
	date.setDate(date.getDate() + days);
	return date.toISOString().split("T")[0];
}

function prevWeek() {
	const startDate = document.getElementById("startDate").value;
	const newStartDate = addDays(startDate, -7); // Subtract 7 days to go to previous week
	document.getElementById("startDate").value = newStartDate;
	loadCalendar();
}

function nextWeek() {
	const startDate = document.getElementById("startDate").value;
	const newStartDate = addDays(startDate, 7); // Add 7 days to go to next week
	document.getElementById("startDate").value = newStartDate;
	loadCalendar();
}

function validateDate() {
	const selectedDate = new Date(document.getElementById("startDate").value);
	const dayOfWeek = selectedDate.getDay();

	if (dayOfWeek !== 1) {
		alert("Please select a Monday.");
		const currentDate = new Date();
		const dayDiff = (currentDate.getDay() - 1 + 7) % 7;
		const lastMonday = new Date(currentDate);
		lastMonday.setDate(currentDate.getDate() - dayDiff);
		document.getElementById("startDate").value = lastMonday
			.toISOString()
			.split("T")[0];
	} else {
		loadCalendar(); // Load calendar when a Monday is selected
	}
}

// Function to handle meeting selection
function handleMeetingSelection(meetingID) {
	const selectedMeeting = document.querySelector(
		`[data-meeting-id="${meetingID}"]`
	);
	selectedMeeting.classList.toggle("selected");
	// Add your logic here to handle the selected meeting
}

// Add event listener for room select dropdown
document.getElementById("roomSelect").addEventListener("change", () => {
	loadCalendar(); // Load calendar when a new room is selected
});

// Add event listener to the start date input field for validation
document.getElementById("startDate").addEventListener("change", validateDate);
