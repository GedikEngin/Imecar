// Function to update the displayed slider values
function updateSliderValues() {
	const hueValue = document.getElementById("hueSlider").value;
	const saturationValue = document.getElementById("saturationSlider").value;
	const brightnessValue = document.getElementById("valueSlider").value;

	document.getElementById("hueValue").textContent = hueValue;
	document.getElementById("saturationValue").textContent = saturationValue;
	document.getElementById("valueBrightness").textContent = brightnessValue;
}

// Event listener for "Change LED Color" button
document
	.getElementById("changeLedButton")
	.addEventListener("click", async () => {
		const hue = document.getElementById("hueSlider").value;
		const saturation = document.getElementById("saturationSlider").value;
		const value = document.getElementById("valueSlider").value;

		// Get the selected MicroEsp IP from the dropdown
		const microEspSelect = document.getElementById("microEspSelect");
		const selectedIndex = microEspSelect.selectedIndex;
		const microEspIP =
			microEspSelect.options[selectedIndex].getAttribute("data-ip");

		try {
			const response = await fetch("/led/setLedUI", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					hue,
					saturation,
					value,
					microEspIP, // Pass the MicroEsp IP along with hue, saturation, and value
				}),
			});

			if (response.ok) {
				// Handle success response
				console.log("LED color changed successfully");
			} else {
				// Handle error response
				const errorMessage = await response.text();
				console.error("Failed to change LED color:", errorMessage);
			}
		} catch (error) {
			console.error("Error changing LED color:", error);
		}
	});

// Function to fetch rooms from the server and populate the select options
async function fetchRooms() {
	try {
		const response = await fetch("/room/rooms");
		if (response.ok) {
			const rooms = await response.json();
			const roomSelect = document.getElementById("roomSelect");
			// Clear existing options
			roomSelect.innerHTML =
				'<option value="">-- Please choose a room --</option>';
			// Populate options with room names and IDs
			rooms.forEach((room) => {
				const option = document.createElement("option");
				option.value = room.roomID;
				option.textContent = `${room.roomName} --- roomID: ${room.roomID}`;
				roomSelect.appendChild(option);
			});
		} else {
			console.error("Failed to fetch rooms:", response.statusText);
		}
	} catch (error) {
		console.error("Error fetching rooms:", error);
	}
}

// Function to fetch MicroEsp data from the server and populate the select options
async function fetchMicroEsps() {
	try {
		const response = await fetch("/microesp/microesp");
		if (response.ok) {
			const microEsps = await response.json();
			const microEspSelect = document.getElementById("microEspSelect");
			microEspSelect.innerHTML =
				'<option value="">-- Please choose an option --</option>';
			for (const microEsp of microEsps) {
				// Fetch room details based on roomID
				const roomResponse = await fetch(
					`/room/search/roomID/${microEsp.roomID}`
				);
				if (roomResponse.ok) {
					const room = await roomResponse.json();
					const deviceType = microEsp.microEspLed ? "LedBar" : "ButtonBox";
					const option = document.createElement("option");
					option.value = microEsp.microEspID;
					option.textContent = `${room.roomName} --- ${microEsp.microEspIP} --- ${deviceType}`;
					option.setAttribute("data-ip", microEsp.microEspIP); // Add MicroEsp IP as a data attribute
					microEspSelect.appendChild(option);
				} else {
					console.error(
						"Failed to fetch room details:",
						roomResponse.statusText
					);
				}
			}
		} else {
			console.error("Failed to fetch MicroEsps:", response.statusText);
		}
	} catch (error) {
		console.error("Error fetching MicroEsps:", error);
	}
}

// Function to add a MicroEsp
async function addMicroEsp(data) {
	try {
		const response = await fetch("/microesp/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			// MicroEsp added successfully, perform any necessary actions
			await fetchMicroEsps(); // Refresh the MicroEsp select options
		} else {
			// Handle error response
			const errorMessage = await response.text();
			console.error("Failed to add MicroEsp:", errorMessage);
		}
	} catch (error) {
		console.error("Error adding MicroEsp:", error);
	}
}

// Event listener for submitting the form to add MicroEsp
document
	.getElementById("addMicroEspForm")
	.addEventListener("submit", async (event) => {
		event.preventDefault();

		// Get form data
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData.entries());

		// Convert deviceType value to boolean
		data.microEspLed = data.deviceType === "ledBar"; // true if ledBar, false otherwise

		// Debugging: Log the data object to see the microEspLed value
		console.log("Data object:", data);

		// Send the data to the server to add MicroEsp
		try {
			const response = await fetch("/microesp/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				// MicroEsp added successfully, perform any necessary actions
				await fetchMicroEsps(); // Refresh the MicroEsp select options
			} else {
				// Handle error response
				const errorMessage = await response.text();
				console.error("Failed to add MicroEsp:", errorMessage);
			}
		} catch (error) {
			console.error("Error adding MicroEsp:", error);
		}
	});

// Event listener for delete button
document
	.getElementById("deleteByIPButton")
	.addEventListener("click", async (event) => {
		event.preventDefault();
		const formData = new FormData(document.getElementById("addMicroEspForm"));
		const microEspIP = formData.get("microEspIP");
		const roomID = formData.get("roomID");

		try {
			const response = await fetch(
				`/microesp/delete/microEspIPRoomID/${microEspIP}/${roomID}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				// MicroEsp deleted successfully, perform any necessary actions
				console.log("MicroEsp deleted successfully");
			} else {
				// Handle error response
				const errorMessage = await response.text();
				console.error("Failed to delete MicroEsp:", errorMessage);
			}
		} catch (error) {
			console.error("Error deleting MicroEsp:", error);
		}
	});

// Event listeners for sliders
document
	.getElementById("hueSlider")
	.addEventListener("input", updateSliderValues);
document
	.getElementById("saturationSlider")
	.addEventListener("input", updateSliderValues);
document
	.getElementById("valueSlider")
	.addEventListener("input", updateSliderValues);

// Call fetchMicroEsps function to populate select options when the page loads
fetchMicroEsps();

// Call fetchRooms function to populate select options when the page loads
fetchRooms();

// Initial update of displayed values
updateSliderValues();
