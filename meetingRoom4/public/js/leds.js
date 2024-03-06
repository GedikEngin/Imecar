// leds.js

document.addEventListener("DOMContentLoaded", function () {
	// Function to send requests to the server to control the LED
	function sendRequest(endpoint, data = {}) {
		fetch(`/led/${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
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

	// Event listener for the container, delegating to the buttons
	document
		.querySelector(".container")
		.addEventListener("click", function (event) {
			if (event.target.classList.contains("setLed")) {
				const hue = event.target.id;
				sendRequest("setLed", { hue });
			} else if (event.target.id === "toggleBlink") {
				sendRequest("toggleBlink");
			}
		});
});
