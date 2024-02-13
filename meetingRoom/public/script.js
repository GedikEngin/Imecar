window.onload = function () {
	// Get the current date
	const currentDate = new Date();
	// Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
	const dayOfWeek = currentDate.getDay();
	// Calculate the number of days to subtract to get to the previous Monday
	const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
	// Create a new date object representing the start of the week
	const startOfWeek = new Date(currentDate);
	startOfWeek.setDate(currentDate.getDate() - daysToMonday + 1);
	// Set the start date input field to the nearest past Monday
	document.getElementById("startDate").value = startOfWeek
		.toISOString()
		.split("T")[0];

	// Load the calendar with the current week's meetings
	loadCalendar();
};

async function loadCalendar() {
	const roomID = document.getElementById("roomSelect").value;
	const startDate = document.getElementById("startDate").value;

	// Calculate the end date by adding 6 days to the start date
	const endDate = addDays(startDate, 6);

	const response = await fetch(
		`http://localhost:8080/api/meetings/getMeetingRoomIDPost?roomID=${roomID}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				queryDateStart: startDate,
				queryDateEnd: endDate, // Automatically calculated end date
			}),
		}
	);

	if (!response.ok) {
		console.error("Failed to fetch meetings:", response.statusText);
		return;
	}

	const meetings = await response.json();

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

				dayDiv.appendChild(meetingDiv);
			}
		});

		calendar.appendChild(dayDiv);
	}
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

// Function to add days to a date
function addDays(dateString, days) {
	const date = new Date(dateString);
	date.setDate(date.getDate() + days);
	return date.toISOString().split("T")[0];
}

// Function to validate the selected date and allow only Mondays
function validateDate() {
	const selectedDate = new Date(document.getElementById("startDate").value);
	const dayOfWeek = selectedDate.getDay();

	if (dayOfWeek !== 1) {
		// 1 represents Monday
		alert("Please select a Monday.");
		// Reset the input field value to the previous Monday
		const currentDate = new Date();
		const dayDiff = (currentDate.getDay() - 1 + 7) % 7;
		const lastMonday = new Date(currentDate);
		lastMonday.setDate(currentDate.getDate() - dayDiff);
		document.getElementById("startDate").value = lastMonday
			.toISOString()
			.split("T")[0];
	}
}

// Add event listener to the start date input field for validation
document.getElementById("startDate").addEventListener("change", validateDate);
