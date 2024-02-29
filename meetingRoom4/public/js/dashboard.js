// JavaScript for the dashboard page

// Get references to the buttons
const meetingsBtn = document.getElementById("meetingsBtn");
const calendarBtn = document.getElementById("calendarBtn");
const roomsBtn = document.getElementById("roomsBtn");

// Add event listeners to the buttons
meetingsBtn.addEventListener("click", redirectToMeetings);
calendarBtn.addEventListener("click", redirectToCalendar);
roomsBtn.addEventListener("click", redirectToRooms);

// Function to redirect to the meetings page
function redirectToMeetings() {
	window.location.href = "../html/meetings"; // Change the URL to the actual route
}

// Function to redirect to the calendar page
function redirectToCalendar() {
	window.location.href = "../html/calendar"; // Change the URL to the actual route
}

// Function to redirect to the rooms page
function redirectToRooms() {
	window.location.href = "../html/rooms"; // Change the URL to the actual route
}
