// loginScript.js

// Add event listener to the form for submission
document
	.getElementById("loginForm")
	.addEventListener("submit", function (event) {
		// Prevent the default form submission behavior
		event.preventDefault();

		// Get the username and password from the form
		const userName = document.getElementById("username").value;
		const userPass = document.getElementById("password").value;

		// Check if the username and password are correct (replace with your authentication logic)
		if (userName === "admin" && userPass === "password") {
			// Set a flag indicating the user is logged in
			localStorage.setItem("isLoggedIn", "true");

			// Redirect the user to calendarView.html
			window.location.href = "calendarView.html";
		} else {
			// If incorrect, show an error message
			alert("Incorrect username or password. Please try again.");
		}
	});

// Check if the user is already authenticated
window.onload = function () {
	const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
	if (isAuthenticated) {
		// Redirect the user to calendarView.html if already authenticated
		window.location.href = "calendarView.html";
	}
};
