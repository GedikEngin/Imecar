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
				const meetingStart = new Date(`2000-01-01T${meeting.meetingStart}`);
				const meetingEnd = new Date(`2000-01-01T${meeting.meetingEnd}`);

				const meetingDiv = document.createElement("div");
				meetingDiv.classList.add("meeting");
				meetingDiv.textContent = `${meeting.meetingStart} - ${meeting.meetingEnd}`;

				dayDiv.appendChild(meetingDiv);
			}
		});

		calendar.appendChild(dayDiv);
	}
}

// Function to add days to a date to auto calc end date
function addDays(dateString, days) {
	const date = new Date(dateString);
	date.setDate(date.getDate() + days);
	return date.toISOString().split("T")[0];
}
