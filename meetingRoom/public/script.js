// calendarScript.js

window.onload = function () {
	if (getTokenStateFromCookie() === "true") {
		console.log("test");
		const currentDate = new Date();
		const dayOfWeek = currentDate.getDay();
		const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
		const startOfWeek = new Date(currentDate);
		startOfWeek.setDate(currentDate.getDate() - daysToMonday);
		document.getElementById("startDate").value = startOfWeek
			.toISOString()
			.split("T")[0];

		loadCalendar();
	} else {
		disableCalendarControls();
		window.location.href = "index.html";
	}
};

async function loadCalendar() {
	if (getTokenStateFromCookie() === "false") {
		return;
	}
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

// Function to disable calendar navigation and room select if user is not authenticated
function disableCalendarControls() {
	document.getElementById("prev-week").disabled = true;
	document.getElementById("next-week").disabled = true;
	document.getElementById("roomSelect").disabled = true;
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

// Function to extract token and check existence from the cookie
function getTokenStateFromCookie() {
	const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
	for (const cookie of cookies) {
		const [name, value] = cookie.split("=");
		if (name.trim() === "token") {
			return "true";
		}
	}
	return "false"; // Return null if token cookie is not found
}
