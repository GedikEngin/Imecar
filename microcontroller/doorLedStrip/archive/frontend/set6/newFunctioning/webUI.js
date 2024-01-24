function toggleDarkMode() {
	const body = document.body;
	const darkModeToggle = document.getElementById("dark-mode-toggle");
	const styleLink = document.getElementById("style-link");

	if (darkModeToggle.checked) {
		styleLink.href = "dark-mode.css"; // Change to the dark mode stylesheet
	} else {
		styleLink.href = "light-mode.css"; // Change to the light mode stylesheet
	}
}

function toggleLeds(button) {
	var currentState = button.getAttribute("data-state");

	if (currentState === "On") {
		button.innerHTML = "Off";
		button.style.backgroundColor = "red";
		button.setAttribute("data-state", "Off");
		toggleState = "off";
		console.log("toggling off");
	} else {
		button.innerHTML = "On";
		button.style.backgroundColor = "#4caf50";
		button.setAttribute("data-state", "On");
		toggleState = "on";
		console.log("toggling on");
	}
}

function resetLed() {
	console.log("reset led func");
}

function writeData() {
	console.log("write data func");
}

function readData() {
	console.log("read data func");
}

function spectrum() {
	console.log("spectrum");
}

function ledButtons(button) {
	if (button.id === "toggleLed") {
		toggleLeds(button);
	} else if (button.id === "resetLed") {
		resetLed();
	} else if (button.id === "spectrum") {
		spectrum();
	} else if (button.id === "writeData") {
		writeData();
	} else if (button.id === "readData") {
		readData();
	}
}

function validateInput(value, fieldName, min, max) {
	// Convert the value to a number
	const numericValue = parseFloat(value);

	// checks if the value starts with 0
	if (/^0[0-9]+$/.test(value)) {
		alert(fieldName + " cannot have leading zeros.");
		return false;
	}

	// Check if the value is a valid number
	if (isNaN(numericValue)) {
		alert(fieldName + " must be a valid number.");
		return false;
	}

	// Check if the value is below the min
	if (min !== undefined && numericValue < min) {
		alert(fieldName + " must be greater than or equal to " + min + ".");
		return false;
	}

	// Check if the value is above the max
	if (max !== undefined && numericValue > max) {
		alert(fieldName + " must be less than or equal to " + max + ".");
		return false;
	}

	// Validation passed
	return true;
}
function sendForm(button) {
	const form = button.closest("form");

	// Validate input before submitting
	const inputs = form.querySelectorAll("input");
	let isValid = true;

	inputs.forEach((input) => {
		const value = input.value;
		const fieldName = input.name;

		// Example: Validate the "fooMod" field with min=1 and max=255
		if (fieldName === "fooMod") {
			isValid = validateInput(value, fieldName, 1, 255);
			if (!isValid) {
				return; // Stop processing if validation fails
			}
		}
		if (
			fieldName === "hue" ||
			fieldName === "saturation" ||
			fieldName === "brightness"
		) {
			isValid = validateInput(value, fieldName);
			if (!isValid) {
				return; // Stop processing if validation fails
			}
		}

		// more validation for other fields if needed
	});

	// If validation passed, proceed with form submission
	if (isValid) {
		const formData = new FormData(form);

		// Set the value of fooID dynamically
		const fooID = form.getAttribute("data-fooID");
		formData.set("fooID", fooID);

		// Log the final data before sending it to the server
		console.log("Final Form Data:", Object.fromEntries(formData));

		fetch("/submit", {
			method: "POST",
			body: formData,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.text();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error("There was a problem with the fetch operation:", error);
			});
	}
}
