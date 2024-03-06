// JavaScript for the dashboard page

// Get references to the buttons
const meetingsBtn = document.getElementById("meetingsBtn");
const roomsBtn = document.getElementById("roomsBtn");
const ledsBtn = document.getElementById("ledsBtn");

// Add event listeners to the buttons
meetingsBtn.addEventListener("click", redirectToMeetings);
roomsBtn.addEventListener("click", redirectToRooms);
ledsBtn.addEventListener("click", redirectToLeds);

// Function to redirect to the meetings page
function redirectToMeetings() {
	window.location.href = "../html/meetings.html"; // Change the URL to the actual route
}

// Function to redirect to the rooms page
function redirectToRooms() {
	window.location.href = "../html/rooms.html"; // Change the URL to the actual route
}

// Function to redirect to the led controller page
function redirectToLeds() {
	window.location.href = "../html/leds.html"; // Change the URL to the actual route
}
