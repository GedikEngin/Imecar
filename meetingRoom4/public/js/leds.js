// leds.js

document.addEventListener("DOMContentLoaded", function () {
	// Function to send requests to the server to control the LED

	function sendRequest(endpoint) {
		fetch(`/led/${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error("There was a problem with the fetch operation:", error);
			});
	}

	// Event listeners for the buttons

	document.getElementById("setRed").addEventListener("click", function () {
		sendRequest("setRed");
	});

	document.getElementById("setYellow").addEventListener("click", function () {
		sendRequest("setYellow");
	});

	document.getElementById("setGreen").addEventListener("click", function () {
		sendRequest("setGreen");
	});

	document.getElementById("toggleBlink").addEventListener("click", function () {
		sendRequest("toggleBlink");
	});
});
